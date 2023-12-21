import React from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FinalDate } from "./Date";
import axios from "axios";
import Navigation from "./Navigation";
import Swal from 'sweetalert2'
import { DBURL, LocalUrl,Local } from "../DBUrl";
const EditData=()=>{
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
                axios.post(Local+'searchid/',{id}).
                then((res)=>{
                //  console.log(res.data[0].Bookid)
                   setBookid(res.data[0].Bookid)
                   setFullname((res.data[0].Fullname))
                   setTelephone((res.data[0].Telephone))
                   setAddress((res.data[0].Address))
                   setPurpose((res.data[0].Purpose))
                   setAmount((res.data[0].Amount))
                   setCartype((res.data[0].Cartype))
                   setDeliveryDate((res.data[0].DeliveryDate))
                   setConfirmPayment((res.data[0].ConfirmPayment))
                   setBookingDate((res.data[0].BookingDate))
                   setDays((res.data[0].Days))
                   setEmail((res.data[0].Email))
                   setService((res.data[0].Service))
                   setDeliveryTime((res.data[0].DeliveryTime))
                   setPaymentStatus((res.data[0].PaymentStatus))
                   
          
                }).catch((err)=>{
                  throw err
                })
              }, [])

              const EditBooking=(e)=>{
                e.preventDefault();
               
                    Swal.fire({
                        title: 'Do you want Update this Booking ?',
                        showDenyButton: true,
                        showCancelButton: true,
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                           // alert('saved successfully')
                           axios.post(Local+'edit',{Fullname,Address,Telephone,Purpose,Amount,Cartype,BookingDate,DeliveryDate,Days,PaymentStatus,ConfirmPayment,Email,Service,DeliveryTime,id}).
                           then((res)=>{
                        }).catch((err)=>{
                            throw err
                          })
                          
                  
                    
                          Swal.fire('Saved', '', 'success')
                        } else if (result.isDenied) {
                          Swal.fire('Changes are not saved', '', 'info')
                        }
                      })
            
                
                }

    return(
        <>
         <div>
            <Navigation />
        </div>
                 <div className="container mt-0" data-wow-delay="0.1s" style={{marginTop: 150}} id="bookingEdit">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="bg-light text-center p-5" >
                        <h1 className="mb-4" style={{marginTop:'-40px'}} >Booking Records</h1>
                        <form onSubmit={EditBooking} style={{marginTop:'-20px'}} >                     
                          <input type="text" className="form-control border-2 font-weight-bold" placeholder="Bookingid"  style={{height: 55,}} hidden value={Bookid} onChange={e=>setBookid(e.target.value)} /> 
                            <div className="row g-3">
                            <div className="col-12 col-sm-6">
                        <label className="for" >Booking Code</label>
                        <input type="text" className="form-control border-2 font-weight-bold" placeholder="Bookingid"  style={{height: 55,}} disabled value={Bookid} onChange={e=>setBookid(e.target.value)} /> 
                        </div>
                        <div className="col-12 col-sm-6">
                                <label className="for" >Email</label>
                                    <input type="email" className="form-control border-2 font-weight-bold" placeholder="Email(@gmail.com)" style={{height: 55}} value={Email}  onChange={e=>setEmail(e.target.value)}/>
                                </div>
                                <div className="col-12 col-sm-6">
                                <label className="for" >Full Name</label>
                                    <input type="text" className="form-control border-2 font-weight-bold" placeholder="Your Name" style={{height: 55,}}  value={Fullname} onChange={e=>setFullname(e.target.value)} onKeyUpCapture={RandomKey}/>
                                </div>
                                <div className="col-12 col-sm-6">
                                <label className="for" >Telephone</label>
                                    <input type="number" className="form-control border-2 font-weight-bold" placeholder="Telephone Number" style={{height: 55}} value={Telephone}  onChange={e=>setTelephone(e.target.value)}/>
                                </div>
                        
                            
                                <div className="col-12 col-sm-6">
                                <label className="for" >Address</label>
                                    <div className="date" id="date1" data-target-input="nearest">
                                        <input type="text"
                                            className="form-control border-2 font-weight-bold datetimepicker-input"
                                            placeholder="Address" data-target="#date1" data-toggle="datetimepicker" style={{height: 55}} value={Address} onChange={e=>setAddress(e.target.value)}/>
                                    </div>
                                   
                                </div>
                                <div className="col-12 col-sm-6">
                                <label className="for" >Purpose</label>
                                    <div className="date" id="date1" data-target-input="nearest">
                                    <input type="text" className="form-control border-2 font-weight-bold" placeholder="Purpose(Example-for Wedding or Tourism)" style={{height: 55}}  value={Purpose}  onChange={e=>setPurpose(e.target.value)}/>
                                    </div>
                                   
                                </div>
                                <div className="col-12 col-sm-6">                                   
                                <label className="for" >Pick Up Date</label>
                                <div className="row">
                                <div className="col-6">
                                <input type="date"  className="form-control border-2 font-weight-bold" placeholder="MM/DD/YYYY"  style={{height: 55}} value={DeliveryDate}  onChange={e=>setDeliveryDate(e.target.value)}/>
                                </div>
                                <div className="col-6">
                                <input type="time"  className="form-control border-2 font-weight-bold" placeholder="-:-:-"  style={{height: 55}} value={DeliveryTime}  onChange={e=>setDeliveryTime(e.target.value)}/>
                                </div>
                                </div>
                                </div>
                                
                                <div className="col-12 col-sm-6">
                                <label className="for" >No. of Days Hired</label>
                                <input type="number" className="form-control border-2 font-weight-bold" placeholder="No. of Days Hired" style={{height: 55}} value={Days}  onChange={e=>setDays(e.target.value)}/>
                                </div>
                                <div className="col-12 col-sm-6">
                                <label className="text-sm-2" >Car Type</label>
                                <input type="text" className="form-control border-2 font-weight-bold" placeholder="Enter Type of Car Example(Land Cruiser)" value={Cartype} style={{height: 55}} onChange={e=>setCartype(e.target.value)}/>
                                </div>
                                <div className="col-12 col-sm-6">
                                <label className="for" >Amount(Full Payment/Commitment Fee)</label>
                                <input type="number" className="form-control border-2 font-weight-bold" placeholder="Enter Amount" style={{height: 55}} value={Amount}  onChange={e=>setAmount(e.target.value)}/>
                                </div>
                                <div className="col-12 col-sm-6">
                                <label className="text-sm-2" >Confirm Payment</label>
                            
                                <select className="form-select border-2 font-weight-bold" style={{height: 50}} onChange={e=>setConfirmPayment(e.target.value)}>
                                        <option selected>{ConfirmPayment}</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Paid">Paid</option>
                                        
                                    </select>
                                </div>
                                <div className="col-12 col-sm-6">
                                <label className="for" >Payment Status </label>
                                <select className="form-select border-2 font-weight-bold" style={{height: 50}} onChange={e=>setPaymentStatus(e.target.value)}>
                                        <option selected>{PaymentStatus}</option>
                                        <option value="Pending">Pending</option>
                                        <option value="full payment">full payment</option>
                                        <option value="Commitment Fee">Commitment Fee</option>
                                        <option value="Part Payment">Part Payment</option>
                                    </select>
                                </div>
                            
                                <div className="col-12 col-sm-6">
                                    <div className="row">

                                    <div className="col-6">

                                <label className="for" >Service</label>
                                <select className="form-select border-2 font-weight-bold" style={{height: 50,marginTop:'-5px'}} onChange={e=>setService(e.target.value)}>
                                        <option selected>{Service}</option>
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        
                                    </select>
                                    </div>
                                    
                                    <div className="col-6">
                                    <label className="for" >Service</label>
                                    <button className="btn btn-warning w-100 py-3 text-black" type="submit" style={{marginTop:'-5px',}}>Update Now</button>
                                    </div>
                                    </div>
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

export default EditData;