import React from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FinalDate } from "./Date";
import axios from "axios";

const Invoice=()=>{
    const [Data,setData]=useState([])
    const [Fullname,setFullname]=useState('')
    const [Address,setAddress]=useState('')
    const [Telephone,setTelephone]=useState(233)
    const [Purpose,setPurpose]=useState('')
    const [Amount,setAmount]=useState('')
    const [Cartype,setCartype]=useState('')
    const [DeliveryDate,setDeliveryDate]=useState('')
    const [Days,setDays]=useState('')
    const [Bookid,setBookid]=useState('')
    const [BookingDate,setBookingDate]=useState(FinalDate)
    const [PaymentStatus,setPaymentStatus]=useState('Pending')
    const [ConfirmPayment,setConfirmPayment]=useState('Pending')
    const [Email,setEmail]=useState('')
    const [Service,setService]=useState('Pending')
    const [DeliveryTime,setDeliveryTime]=useState('')

    const navigate=useNavigate();
    

    const {id}=useParams()

        // /getting product id for each & every product to be added to store
        function RandomKey() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let Key='BKN00';
            const length=4
            const Prefix='PRD00'
            let Productid=''
            
             for (let i = 0; i < length; i++) {
               const randomIndex = Math.floor(Math.random() * characters.length);
               Key += characters.charAt(randomIndex);
             }
            
             setBookid(Key)
            return Bookid
            }

            useEffect(() => {
                axios.get('http://localhost:5000/bookings/'+id).
                then((res)=>{
                  console.log(res.data.Bookid)
                   setBookid(res.data.Bookid)
                   setFullname((res.data.Fullname))
                   setTelephone((res.data.Telephone))
                   setAddress((res.data.Address))
                   setPurpose((res.data.Purpose))
                   setAmount((res.data.Amount))
                   setCartype((res.data.Cartype))
                   setDeliveryDate((res.data.DeliveryDate))
                   setConfirmPayment((res.data.ConfirmPayment))
                   setBookingDate((res.data.BookingDate))
                   setDays((res.data.Days))
                   setEmail((res.data.Email))
                   setService((res.data.Service))
                   setDeliveryTime((res.data.DeliveryTime))
                   
          
                }).catch((err)=>{
                  throw err
                })
              }, [])

              const handlePrint = () => {
                window.print();
              };

              const EditBooking=(e)=>{
                const FindCode={
                    DeliveryDate:DeliveryDate,
                    Telephone:Telephone,
                Amount:Amount,

                }
                e.preventDefault()
                axios.get('http://localhost:5000/bookings/',{params:FindCode}).
                then((res)=>{
            navigate()
                    setData(res.data)
                    
                  console.log(res.data)
                  alert(res.data[0].Fullname)
            
                }).catch((err)=>{
                  alert("No SUCH RECORD EXIST.PLEASE CHECK IF CREDENTIALS PROVIDED ARE CORRECT")
                })
                
                }

    return(
        <>
         <div className="card">
  <div className="card-body">
    <div className="container mb-5 mt-3">
      <div className="row d-flex align-items-baseline">
        <div className="col-xl-9">
           
          {/* <p  style={{color: '#7e8d9f',fontSize: '20px'}}>Booking Code<strong>:{Bookid}</strong></p> */}
        </div>
      
        <hr />
      </div>

      <div className="container">
        <div className="col-md-12">
          <div className="text-center">
            {/* <i className="fab fa-mdb fa-4x ms-0" style={{color:'#5d9fc5'}}></i> */}
            <h1>N MENSAH CAR RENTALS</h1> 
            <span>0242648325-0244491738-Oforikrom Opp Police Station</span><br/>
            <span>P.O BOX SE 1727 SUAME(KSI)-baidoorichard454@gmail.com</span><br/>
            <h4 className="pt-0">Booking Invoice</h4>
          </div>

        </div>


        <div className="row">
          <div className="col-xl-8">
            <ul className="list-unstyled">
              <li className="text-muted">Booking Code: <span  style={{color:'#5d9fc5',fontWeight:'bold'}}>{Bookid}</span></li>
              <li className="text-muted">Name:<span  style={{color:'#5d9fc5',fontWeight:'bold'}}>{Fullname}</span></li>
              <li className="text-muted">Email:<span  style={{color:'#5d9fc5',fontWeight:'bold'}}>{Email}</span></li>
              <li className="text-muted">Telephone:<span  style={{color:'#5d9fc5',fontWeight:'bold'}}>{Telephone}</span></li>
            </ul>
          </div>
          <div className="col-xl-4">
            <ul className="list-unstyled">
              <li className="text-muted"><i className="fas fa-circle"  style={{color:'#84B0CA'}}></i> <span
                  className="fw-bold">Booking Date:</span>{BookingDate}</li>
              <li className="text-muted"><i className="fas fa-circle"  style={{color:'#84B0CA'}}></i> <span
                  className="fw-bold">Delivery Date: </span>{DeliveryDate}</li>
              <li className="text-muted"><i className="fas fa-circle"  style={{color:'#84B0CA'}}></i> <span
                  className="me-1 fw-bold">Pick Up Time:</span><span className="badge bg-warning text-black fw-bold">
                  {DeliveryTime}</span></li>
            </ul>
          </div>
        </div>

        <div className="row my-2 mx-1 justify-content-center">
          <table className="table table-striped table-borderless">
            <thead  style={{backgroundcolor:'#84B0CA'}} className="text-white">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Vehicle(Type)</th>
                <th scope="col">Purpose</th>
                <th scope="col">Number of Days</th>
                <th scope="col">Payment Status</th>
                <th scope="col">Payment Confirmation</th>
                <th scope="col">Service</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>{Cartype}</td>
                <td>{Purpose}</td>
                <td>{Days}</td>
                <td>{PaymentStatus}</td>
                <td>{ConfirmPayment}</td>
                <td>{Service}</td>
              </tr>
     
             
            </tbody>

          </table>
        </div>
        <div className="row">
          <div className="col-xl-8">
            <p className="ms-3">Always Reprint this invoice after payment confirmation by admin</p>

          </div>
          <div className="col-xl-3">
            <ul className="list-unstyled">
            </ul>
            <p className="text-black float-start"><span className="text-black me-3">AMOUNT PAID</span><span
                 style={{fontSize: '25px'}}>GH₵{Amount}</span></p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-xl-10">
            <p>Developed and designed by Airsales IT Solution-0552795346</p>
          </div>
          <div className="col-xl-2">
            <button onClick={handlePrint} type="button" className="btn btn-primary text-capitalize"
               style={{background:'#60bdf3'}} id="myprint">Print Now</button>

          </div>
          
        </div>

      </div>
    </div>
  </div>
</div>
        </>
    )
}

export default Invoice;