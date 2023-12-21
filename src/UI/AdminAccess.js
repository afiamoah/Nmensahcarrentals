import React from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FinalDate } from "./Date";
import axios from "axios";
import Navigation from "./Navigation2";

const AdminAccess=()=>{
    const [Data,setData]=useState([])
    let [key,setkey]=useState('')

    const navigate=useNavigate()
    const AdminKey="NMCRRiggedkey!"
    
const DashBoardAccess=(e)=>{
    e.preventDefault()
     key == AdminKey ? navigate('/dashboard') : alert('WRONG ADMIN CREDENTIALS')
    return key

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
        {/* <div className="container-fluid" >
            <Navigation />
        </div> */}
            <div className="container mt-0" data-wow-delay="0.1s" style={{marginTop: 150}} id="bookingEdit">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="bg-light text-center p-5">
                        <h1 className="mb-4">Enter Administrative Key</h1>
                       
                        <form onSubmit={DashBoardAccess}> 
                        <div className="col-12" style={{marginBottom:'20px'}}>                    
                        <input type="text" className="form-control border-0" placeholder="Enter Admin Key" style={{height: 55}} value={key}  onChange={e=>setkey(e.target.value)}/>
                         </div>           
                                <div className="col-12">
                                    <button className="btn btn-primary w-100 py-3" type="submit">Get Access</button>
                                    <button className="btn btn-success w-100 py-3 mt-3" type="button"><a href="/" className="text-white">Home</a></button>
                                </div>                            
                            
                        </form>
                    </div>
                </div>
                </div>
                </div>
        
        </>
    )
}

export default AdminAccess;