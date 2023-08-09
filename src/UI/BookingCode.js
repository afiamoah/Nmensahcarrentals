import React from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FinalDate } from "./Date";
import axios from "axios";
import Navigation from "./Navigation";

const BookingCode=()=>{
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
    const [id,setid]=useState('')

    const navigate=useNavigate()
    

  

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

            // useEffect(() => {
            //     axios.get('http://localhost:5000/bookings/'+id).
            //     then((res)=>{
            //       console.log(res.data.Bookid)
            //        setBookid(res.data.Bookid)
            //        setFullname((res.data.Fullname))
            //        setTelephone((res.data.Telephone))
            //        setAddress((res.data.Address))
            //        setPurpose((res.data.Purpose))
            //        setAmount((res.data.Amount))
            //        setCartype((res.data.CarType))
            //        setDeliveryDate((res.data.DeliveryDate))
            //        setConfirmPayment((res.data.ConfirmPayment))
            //        setBookingDate((res.data.BookingDate))
            //        setDays((res.data.Days))
            //        setEmail((res.data.Email))
            //        setService((res.data.Service))
            //        setDeliveryTime((res.data.DeliveryTime))
                   
          
            //     }).catch((err)=>{
            //       throw err
            //     })
            //   }, [])

              const EditBooking=(e)=>{
                e.preventDefault()
                const FindCode={
                    DeliveryDate:DeliveryDate,
                    Telephone:Telephone,
                Amount:Amount,

                }
                
                axios.get('http://localhost:5000/bookings/',{params:FindCode}).
                then((res)=>{    
                    navigate('/invoice/'+res.data[0].id)
                    
            
                }).catch((err)=>{
                  alert("No SUCH RECORD EXIST.PLEASE CHECK IF CREDENTIALS PROVIDED ARE CORRECT"+err)
                })
                
                }

    return(
        <>
        
                 <div className="container mt-0" data-wow-delay="0.1s" style={{marginTop: 150}} id="bookingEdit">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="bg-light text-center p-5">
                        <h1 className="mb-4">Find My Booking Code</h1>
                        <p style={{color:'green'}}>Enter Delivery date,mobile number & exact amount paid to find your booking code</p>
                        <form onSubmit={EditBooking} > 
                        <div className="col-12">                    
                        <input type="date"  className="form-control border-0" placeholder="MM/DD/YYYY"  style={{height: 55}} value={DeliveryDate}  onChange={e=>setDeliveryDate(e.target.value)}/>
                                </div>
                            <div className="row g-3">
                            <div className="col-12">
                            <label className="for" >Telephone</label>
                                    <input type="number" className="form-control border-0" placeholder="Telephone Number" style={{height: 55}} value={Telephone}  onChange={e=>setTelephone(e.target.value)}/>
                        </div>
                        <div className="col-12">
                                <label className="for" >Amount(Full Payment/Commitment Fee)</label>
                                <input type="number" className="form-control border-0" placeholder="Enter Amount" style={{height: 55}} value={Amount}  onChange={e=>setAmount(e.target.value)}/>
                                </div>               
                                <div className="col-12">
                                    <button className="btn btn-primary w-100 py-3" type="submit">Find Now</button>
                                </div>
                             
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default BookingCode;