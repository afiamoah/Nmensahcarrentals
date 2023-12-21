import React from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState,useEffect } from "react";
import { FinalDate,Reminder,noticeDate } from "./Date";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "./Navigation";
import Swal from 'sweetalert2'
import { DBURL,LocalUrl,Local } from "../DBUrl";
import NotificationDate from "./Date";

 const NewBook=()=>{
    const [Fullname,setFullname]=useState('')
    const [Address,setAddress]=useState('')
    const [Telephone,setTelephone]=useState(233)
    const [Purpose,setPurpose]=useState('')
    const [Amount,setAmount]=useState('')
    const [Cartype,setCartype]=useState('')
    const [DeliveryDate,setDeliveryDate]=useState('')
    const [Days,setDays]=useState('')
    const [Bookid,setBookid]=useState('123ert')
    const [BookingDate,setBookingDate]=useState(FinalDate)
    const [PaymentStatus,setPaymentStatus]=useState('Pending')
    const [ConfirmPayment,setConfirmPayment]=useState('Pending')
    const [Email,setEmail]=useState('')
    const [Service,setService]=useState('Pending')
    const [DeliveryTime,setDeliveryTime]=useState('0:00')
    const ReminderDate= NotificationDate(DeliveryDate)

    const {id}=useParams()
    const navigate=useNavigate()
    
    // /getting product id for each & every product to be added to store
    function RandomKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let Key='NMCR00';
    const length=4
    const Prefix='NMCR00'
    let Productid=''
    
     for (let i = 0; i < length; i++) {
       const randomIndex = Math.floor(Math.random() * characters.length);
       Key += characters.charAt(randomIndex);
     }
    
     setBookid(Key)
    return Bookid
    }
    const SubmitBooking=(e)=>{
        e.preventDefault();
      
            Swal.fire({
                title: 'Do you want Save this Booking ?',
                showDenyButton: true,
                showCancelButton: true,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  axios.post(LocalUrl+"newbooking",{Bookid,Fullname,Address,Telephone,Purpose,Amount,Cartype,BookingDate,DeliveryDate,Days,PaymentStatus,ConfirmPayment,Email,Service,DeliveryTime,ReminderDate}).
                  then((res)=>{
                }).catch((err)=>{
                  throw err
                })
                   // alert('saved successfully')
      generateInvoice();
      //sendEmail();
          
            
                  Swal.fire('Saved', '', 'success')
                } else if (result.isDenied) {
                  Swal.fire('Changes are not saved', '', 'info')
                }
              })
        }

        const generateInvoice=()=>{
            // const FindCode={
            //     Telephone:Telephone,
            //     Bookid:Bookid,
    
            // }
           
            axios.post(LocalUrl+"myid",{Bookid,Telephone}).
            then((res)=>{
                navigate('/invoice/'+res.data[0].id)
              console.log(res.data)
            
        
            }).catch((err)=>{
                throw err
              alert("No SUCH RECORD EXIST.PLEASE CHECK IF CREDENTIALS PROVIDED ARE CORRECT")
            })
            
            }

   

  const  front={

        width: "100%",
      
      }

      const container ={
        position: "relative",
        width: "100%",
        height: "0",
        paddingButtom: "100%"
      }
return(
<>    

<Helmet>
<link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Roboto:wght@500;700&display=swap" rel="stylesheet" />


    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />


    <link href="lib/animate/animate.min.css" rel="stylesheet" />
    <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
    <link href="lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />

    
    <link href="css/bootstrap.min.css" rel="stylesheet" />

  
    <link href="css/style.css" rel="stylesheet" />


    <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-0 back-to-top"><i className="bi bi-arrow-up">  <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="lib/wow/wow.min.js"></script>
    <script src="lib/easing/easing.min.js"></script>
    <script src="lib/waypoints/waypoints.min.js"></script>
    <script src="lib/counterup/counterup.min.js"></script>
    <script src="lib/owlcarousel/owl.carousel.min.js"></script>
    <script src="lib/tempusdominus/js/moment.min.js"></script>
    <script src="lib/tempusdominus/js/moment-timezone.min.js"></script>
    <script src="lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js"></script>


    <script src="js/main.js"></script></i></a>

            </Helmet>
<body>
    < Navigation />
<div className="container-fluid bg-light d-none d-lg-block">
      
    </div>

 

    


    

        <div className="container position-relative wow fadeInUp" data-wow-delay="0.1s" style={{marginTop: -6}} id="booking">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="bg-light text-center p-5">
                        <h1 className="mb-4">Book for a Service</h1>
                        <form action="#" onSubmit={SubmitBooking} className="request-form  bg-dark">
		        
                  <div className="d-flex">
                  <div className="form-group mr-2"> 
                 <textarea name="message"  hidden />
                  <textarea name="message" hidden="true" /> 
                  {/* <input type="text" name="message"  className="form-control border-0" placeholder="Bookingid"  style={{height: 55,}} disabled value={newBooking}/> */}
                    <label htmlFor="" className="label">Booking Code</label>
			    					<input type="text" className="form-control" placeholder="Booking ID" disabled value={Bookid} onChange={e=>setBookid(e.target.value)} />
			    				</div>
                  <div className="form-group"> 
                  <label htmlFor="" className="label">Email</label>
			    					<input type="email"  name="user_email"  className="form-control" placeholder="Email(@gmail.com)" value={Email}  onChange={e=>setEmail(e.target.value)}/>
			    				</div>
                  </div>
                  <div className="d-flex">
                  <div className="form-group mr-2">
			    					<label htmlFor="" className="label">Name</label>
                    <input type="text"  name="user_name" placeholder="Your Name" className="form-control border border-white bg-dark" value={Fullname} onChange={e=>setFullname(e.target.value)} onKeyUpCapture={RandomKey}/>
			    				</div>
              
                  </div>
                  <div className="d-flex">
                  <div className="form-group mr-2">
			    					<label htmlFor="" className="label">Telephone</label>
			    					<input type="number"  name="user_name"  placeholder="Telephone Number" className="form-control"   value={Telephone}  onChange={e=>setTelephone(e.target.value)}/>
			    				</div>
                  <div className="form-group">
			    					<label htmlFor="" className="label">Adress</label>
                    <input type="text"  name="user_name" placeholder="Address"  className="form-control" value={Address} onChange={e=>setAddress(e.target.value)}/>
			    					{/* <label htmlFor="" className="label">Purpose</label>
			    					<input type="text"  name="user_name" className="form-control" placeholder="Purpose(Example-for Wedding or Tourism)" style={{height: 55}}  value={Purpose}  onChange={e=>setPurpose(e.target.value)}/> */}
			    				</div>
                  </div>

                  <div className="d-flex">
                  <div className="form-group mr-2">
			    				<label htmlFor="" className="label">Purpose</label>
			    					<input type="text"  name="user_name" className="form-control" placeholder="Purpose(Example-for Wedding or Tourism)" style={{height: 55}}  value={Purpose}  onChange={e=>setPurpose(e.target.value)}/>
			    				</div>
                  <div className="form-group">
			    				<label htmlFor="" className="label">No. of Days Hired</label>
                  <input type="number" className="form-control border border-white" placeholder="No. of Days Hired" value={Days}  onChange={e=>setDays(e.target.value)}/>
			    					 
			    				</div>
                  </div>
			    			
			    				<div className="d-flex">
			    					<div className="form-group mr-2">
                    <label htmlFor="" className="label">Pick Up Date</label>
                    <input type="date"  className="form-control" placeholder="MM/DD/YYYY"  value={DeliveryDate}  onChange={e=>setDeliveryDate(e.target.value)}/>
			              </div>
			              <div className="form-group ml-2">
                    <label htmlFor="" className="label">Pick Up Time</label>
                    <input type="time"  className="form-control border border-white" placeholder="-:-:-"   value={DeliveryTime}  onChange={e=>setDeliveryTime(e.target.value)}/>
			              </div>
		              </div>
		              <div className="form-group">
		                <label htmlFor="" className="label">Car Type</label>
		                <input type="text" className="form-control" placeholder="Enter Type of Car Example(Land Cruiser)" value={Cartype}  onChange={e=>setCartype(e.target.value)}/>
		              </div>
                  <div className="form-group">
		                <label htmlFor="" className="label">Amount(Full Payment/Commitment Fee)</label>
                    <input type="number" className="form-control" placeholder="Enter Amount"  value={Amount}  onChange={e=>setAmount(e.target.value)}/>
		              </div>
			            <div className="form-group">
			              <input type="submit" value="Rent A Car Now" className="btn btn-secondary py-3 px-4" />
			            </div>
			    			</form>
                    </div>
                </div>
            </div>
        </div>
        



    <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s" />
        <div className="container py-5 bg-dark">
            <div className="row g-5">
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-light mb-4">Address</h4>
                    <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>P.O BOX SE 1727 SUAME(KSI)</p>
                    <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>0242648325-0244491738</p>
                    <p className="mb-2"><i className="fa fa-envelope me-3"></i>baidoorichard454@gmail.com</p>
                    <div className="d-flex pt-2">
                    <a className="btn btn-sm-square bg-white text-primary me-1" href="https://api.whatsapp.com/send?phone=+233242648325&text=Hello i need a car to rent"><i className="fab fa-whatsapp"></i></a>
                    <a className="btn btn-sm-square bg-white text-primary me-1" href="https://api.whatsapp.com/send?phone=+233242648325&text=Hello i need a car to rent"><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-sm-square bg-white text-primary me-1" href=""><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-sm-square bg-white text-primary me-0" href=""><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-light mb-4">Opening Hours</h4>
                    <h6 className="text-light">Monday - Friday:</h6>
                    <p className="mb-4">7 am–6:30 pm</p>
                    <h6 className="text-light">Saturday:</h6>
                    <p className="mb-0">7 am–6:30 pm</p>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-light mb-4">Services</h4>
                    <a className="btn btn-link" href="">CAR RENTALS FOR:</a>
                    <a className="btn btn-link" href="">Wedding</a>
                    <a className="btn btn-link" href="">Funeral</a>
                    <a className="btn btn-link" href="">Tourism</a>
                    <a className="btn btn-link" href="">Excursion</a>
                    <a className="btn btn-link" href="">Other Business & Recreational Purposes</a>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-light mb-4">Newsletter</h4>
                    <p>Give us feed back concerning services we render.</p>
                    <div className="position-relative mx-auto" style={{ maxWidth: 400}}>
                        <input className="form-control border-0 w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" />
                        <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="copyright">
                <div className="row">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <a className="border-bottom" href="#">nmensahcarrentals.com</a>, All Right Reserved.
                    </div>
                    <div className="col-md-6 text-center text-md-end">
<p>payment</p>
                    </div>
                </div>
            </div>
        </div>
    {/* </div>
    <!-- Footer End -->


    <!-- Back to Top --> */}
    <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-0 back-to-top"><i className="bi bi-arrow-up">  <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="lib/wow/wow.min.js"></script>
    <script src="lib/easing/easing.min.js"></script>
    <script src="lib/waypoints/waypoints.min.js"></script>
    <script src="lib/counterup/counterup.min.js"></script>
    <script src="lib/owlcarousel/owl.carousel.min.js"></script>
    <script src="lib/tempusdominus/js/moment.min.js"></script>
    <script src="lib/tempusdominus/js/moment-timezone.min.js"></script>
    <script src="lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js"></script>


    <script src="js/main.js"></script></i></a>

    </body>
</>

)
}

export default NewBook;