import React from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState,useEffect } from "react";
import { FinalDate,Reminder,noticeDate } from "./Date";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'
import { DBURL,LocalUrl,Local } from "../DBUrl";
import NotificationDate from "./Date";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { io} from "socket.io-client";
import { Button } from "bootstrap";
const socket=io.connect('http://localhost:4000')
import {HideContact,ShowInfo} from "./visibleinfo";
import { BusinessName1, BusinessName2,Motto,SubDetails,Whatsapp,Facebook,Instagram,xTwitter,Mobile,Emails,Location} from "./Business/BusinessDetails";
export const FrontEnd=()=>{

  const [Fullname,setFullname]=useState('yaw')
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
  const [Data,setData]=useState([])
  const [MyDate,setMyDate]=useState()
  const [AdminID,setAdminID]=useState('RiggedKey')

  const {id}=useParams()
  const navigate=useNavigate()
  const form = useRef();
  const newBooking="NEW BOOKING FROM  "+ Fullname+" PLEASE CHECK DASHBOARD"
  const ReminderDate= NotificationDate(DeliveryDate)

  const notifyDelivery=()=>{
      axios.get(Local).
      then((res)=>{
          const timer = setTimeout(()=>{
   setData(res.data)
          // console.log(res.data)
          const checkNotify=res.data.filter((date)=>{
              console.log(date.DeliveryDate)
      if(date.DeliveryDate === FinalDate){
          alert('delivery date is today')
          return date
      }
          })
      //     setMyDate(checkNotify)
      //    // console.log(MyDate)
      //     if(MyDate === FinalDate){
            
      //     }          
}, 2000);

return timer
         

      }).catch((err)=>{
console.log(err)
      })
  }





//send emal
const sendEmail = () => {
//  emailjs.sendForm('service_uk9geig', 'template_ygsqean', form.current, 'M8WCKeewSaV95ZrUk')
  emailjs.sendForm('service_tu3nucf', 'template_uv94tx4', form.current, 'M8WCKeewSaV95ZrUk')
    .then((result) => {
       // alert('message sent'+ result.text)
    }, (error) => {
      alert('message sent  '+error)
        console.log(error.text);
    });
};

  
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

  const AlertNewBooking=()=>{
if(AdminID =='RiggedKey'){
  socket.emit("access_room", AdminID)
}
socket.emit("notify",{newBooking,AdminID})
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
            axios.post(Local+"newbooking",{Bookid,Fullname,Address,Telephone,Purpose,Amount,Cartype,BookingDate,DeliveryDate,Days,PaymentStatus,ConfirmPayment,Email,Service,DeliveryTime,ReminderDate}).
            then((res)=>{
              generateInvoice();
              AlertNewBooking();
          }).catch((err)=>{
            alert(err.toJSON())
          })
             // alert('saved successfully')

//sendEmail();

    
      
            Swal.fire('Saved', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })


 
  }

  const test=()=>{
  
    AlertNewBooking();


  }
const GetId=()=>{
  axios.post(LocalUrl+"myid",{Telephone}).
  then((res)=>{
      console.log(res.data)

  }).catch((err)=>{
      throw err
  })

}
  const generateInvoice=()=>{
      // const FindCode={
      //     Telephone:Telephone,
      //     Bookid:Bookid,

      // }
     
      axios.post(Local+"myid",{Bookid,Telephone}).
      then((res)=>{
        
         navigate('/invoice/'+res.data[0].id)
        console.log(res.data)
  
      }).catch((err)=>{
         // throw err
         alert(err)
        alert("No SUCH RECORD EXIST.PLEASE CHECK IF CREDENTIALS PROVIDED ARE CORRECT")
       
      })
      
      }

      const notify = () => toast(newBooking);

      
useEffect(() => {
  HideContact();
  ShowInfo()

  socket.on("show_message",(message)=>{
 // toast(message.newBooking);
  toast(message.newBooking, {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
 
  })
 }, [])
return(
  <>
 <ToastContainer />
	  <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
	    <div className="container">
	      <a className="navbar-brand" href="index.html">{BusinessName1} <span>{BusinessName2}</span></a>
	      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
	        <span className="oi oi-menu"></span> Menu
	      </button>

	      <div className="collapse navbar-collapse" id="ftco-nav">
	        <ul className="navbar-nav ml-auto">
	          <li className="nav-item active"><a href="/" className="nav-link">Home</a></li>
	          <li className="nav-item"><a href="#newbooking" className="nav-link">Rent a Car Now</a></li>
	          <li className="nav-item"><a href="/admin" className="nav-link">Dashboard</a></li>
	           <li className="nav-item"><a href="#contactus"  className="nav-link">Contact Us</a></li>
             {/* <button onClick={notify}>CLICK</button> */}
            
	          <li className="nav-item"><a href="#aboutus" className="nav-link">About Us</a></li>
	          <li className="nav-item"><a href="contact.html" className="nav-link">Reigister</a></li>
	        </ul>
	      </div>
	    </div>
	  </nav>

    <div className="hero-wrap ftco-degree-bg" style={{backgroundImage: "url('fonts/images/bg_1.jpg')"}}>
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text justify-content-start align-items-center justify-content-center">
          <div className="col-lg-8">
          	<div className="text w-100 text-center mb-md-3 pb-md-3" id="maintext">
	            <h2 className="mb-4 text-white">{Motto}</h2>
	            <p style={{fontSize: "18px"}}>{SubDetails}</p>
	            <a href="img/addvideo.mp4" className="icon-wrap popup-vimeo d-flex align-items-center mt-4 justify-content-center">
	            	<div className="icon d-flex align-items-center justify-content-center">
	            		<span className="ion-ios-play"></span>
	            	</div>
	            	<div className="heading-title ml-5">
		            	<span>Just have  a View</span>
	            	</div>
	            </a>
            </div>
          </div>
        </div>
      </div>
    </div>
     <section className="ftco-section ftco-no-pt bg-light" id="newbooking">
    	<div className="container">
    		<div className="row no-gutters">
    			<div className="col-md-12	featured-top">
    				<div className="row no-gutters">
	  					<div className="col-md-4 d-flex align-items-center">
                {/* <button onClick={test}>NOTIFY</button> */}
	  						 <form action="#" ref={form} onSubmit={SubmitBooking} className="request-form  bg-dark">
		          		<h2>Rent Now</h2>
              
                  <div className="d-flex">
                  <div className="form-group mr-2"> 
                 <textarea name="message"  hidden />
                  <textarea name="message" value={newBooking} hidden="true" /> 
                  {/* <input type="text" name="message"  className="form-control border-0" placeholder="Bookingid"  style={{height: 55,}} disabled value={newBooking}/> */}
                    <label htmlFor="" className="label">Booking Code</label>
			    					<input type="text" className="form-control text-dark" placeholder="Booking ID" disabled value={Bookid} onChange={e=>setBookid(e.target.value)} id="allfields"  />
			    				</div>
                  <div className="form-group"> 
                  <label htmlFor="" className="label">Email</label>
			    					<input type="email"  name="user_email"  className="form-control" placeholder="Email(@gmail.com)" value={Email}  onChange={e=>setEmail(e.target.value)} id="allfields"/>
			    				</div>
                  </div>
                  <div className="d-flex">
                  <div className="form-group mr-2">
			    					<label htmlFor="" className="label">Name</label>
                    <input type="text"  name="user_name" placeholder="Your Name" className="form-control" value={Fullname} onChange={e=>setFullname(e.target.value)} onKeyUpCapture={RandomKey} id="allfields"/>
			    				</div>
              
                  </div>
                  <div className="d-flex">
                  <div className="form-group mr-2">
			    					<label htmlFor="" className="label">Telephone</label>
			    					<input type="number"  name="user_name"  placeholder="Telephone Number" className="form-control"   value={Telephone}  onChange={e=>setTelephone(e.target.value)} id="allfields"/>
			    				</div>
                  <div className="form-group">
			    					<label htmlFor="" className="label">Address</label>
                    <input type="text"  name="user_name" placeholder="Address"  className="form-control" value={Address} onChange={e=>setAddress(e.target.value)} id="allfields"/>
			    					{/* <label htmlFor="" className="label">Purpose</label>
			    					<input type="text"  name="user_name" className="form-control" placeholder="Purpose(Example-for Wedding or Tourism)" style={{height: 55}}  value={Purpose}  onChange={e=>setPurpose(e.target.value)}/> */}
			    				</div>
                  </div>

                  <div className="d-flex">
                  <div className="form-group mr-2">
			    				<label htmlFor="" className="label">Purpose</label>
			    					<input type="text"  name="user_name" className="form-control" placeholder="Purpose(Example-for Wedding or Tourism)"   value={Purpose}  onChange={e=>setPurpose(e.target.value)} id="allfields"/>
			    				</div>
                  <div className="form-group">
			    				<label htmlFor="" className="label">No. of Days Hired</label>
                  <input type="number" className="form-control border border-white" placeholder="No. of Days Hired" value={Days}  onChange={e=>setDays(e.target.value)} id="allfields"/>
			    					 
			    				</div>
                  </div>
			    			
			    				<div className="d-flex">
			    					<div className="form-group mr-2">
                    <label htmlFor="" className="label">Pick Up Date</label>
                    <input type="date"  className="form-control" placeholder="MM/DD/YYYY"  value={DeliveryDate}  onChange={e=>setDeliveryDate(e.target.value)} id="allfields"/>
			              </div>
			              <div className="form-group ml-2">
                    <label htmlFor="" className="label">Pick Up Time</label>
                    <input type="time"  className="form-control border border-white" placeholder="-:-:-"   value={DeliveryTime}  onChange={e=>setDeliveryTime(e.target.value)} id="allfields"/>
			              </div>
		              </div>
		              <div className="form-group">
		                <label htmlFor="" className="label">Car Type</label>
		                <input type="text" className="form-control" placeholder="Enter Type of Car Example(Land Cruiser)" value={Cartype}  onChange={e=>setCartype(e.target.value)} id="allfields"/>
		              </div>
                  <div className="form-group">
		                <label htmlFor="" className="label">Amount(Full Payment/Commitment Fee)</label>
                    <input type="number" className="form-control" placeholder="Enter Amount"  value={Amount}  onChange={e=>setAmount(e.target.value)} id="allfields"/>
		              </div>
			            <div className="form-group">
			              <input type="submit" value="Rent A Car Now" className="btn btn-secondary py-3 px-4" id="submit" />
			            </div>
                  <p style={{color:'white',fontSize:'15px'}} id="info" className="background-white">After filling this form,please send the commitment or full payment to mobile money number-<strong id="strong" style={{color:'#20c997',fontSize:'20px'}}>0244491738.(Account name-Mensah Nicholas).</strong>
                        wait for a confirmation call and reprint booking invoice</p>
			    			</form>

              {/* /  //////////////////////////////////////////////////////////////////////// */}

               
	  					</div>
	  					<div className="col-md-8 d-flex align-items-center">
	  						<div className="services-wrap rounded-right w-100">
	  							<h3 className="heading-section mb-4">Better Way to Rent Your Perfect Cars</h3>

	  							<div className="row d-flex mb-4">
					          <div className="col-md-4 d-flex align-self-stretch">
					            <div className="services w-100 text-center">
				              	<div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-route"></span></div>
				              	<div className="text w-100">
					                <h3 className="heading mb-2">Choose Your Pickup Location</h3>
				                </div>
					            </div>      
					          </div>
					          <div className="col-md-4 d-flex align-self-stretch">
					            <div className="services w-100 text-center">
				              	<div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-handshake"></span></div>
				              	<div className="text w-100">
					                <h3 className="heading mb-2">Select the Best Deal</h3>
					              </div>
					            </div>      
					          </div>
					          <div className="col-md-4 d-flex align-self-stretch">
					            <div className="services w-100 text-center">
				              	<div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-rent"></span></div>
				              	<div className="text w-100">
					                <h3 className="heading mb-2">Reserve Your Rental Car</h3>
					              </div>
					            </div>      
					          </div>
					        </div>
					        <p><a  className="btn btn-primary py-3 px-4" href="/code">Find My Booking Code</a></p>
	  						</div>
	  					</div>
	  				</div>
				</div>
  		</div>
      </div>
    </section>


    <section className="ftco-section ftco-no-pt bg-light">
    	<div className="container">
    		<div className="row justify-content-center">
          <div className="col-md-12 heading-section text-center mb-5">
          	<span className="subheading">What we offer</span>
            <h2 className="mb-2">Featured Vehicles</h2>
          </div>
        </div>
        <div className="row d-flex">
          <div className="col-md-4 d-flex">
          	<div className="blog-entry justify-content-end">
              <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('img/landback.jpeg')"}}>
              </a>
              <div className="text pt-4">
              	<div className="meta mb-3">
         
                </div>
                <h3 className="heading mt-2"><a >Land Cruiser V8</a></h3>
                <p><a href={Whatsapp} className="btn btn-success">Book Now  <i className="fab fa-whatsapp"></i></a></p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
          	<div className="blog-entry justify-content-end">
              <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('img/ccivic.jpg')"}}>
              </a>
              <div className="text pt-4">
              	<div className="meta mb-3">
         
                </div>
                <h3 className="heading mt-2"><a >Honda Civic</a></h3>
                <p><a href="https://api.whatsapp.com/send?phone=+233242648325&text=Hello i need a car to rent" className="btn btn-success">Book Now  <i className="fab fa-whatsapp"></i></a></p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
          	<div className="blog-entry">
              <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('img/inside1.jpg')"}}>
              </a>
              <div className="text pt-4">
              	<div className="meta mb-3">
         
                </div>
                <h3 className="heading mt-2"><a >Fine Interior</a></h3>
                <p><a href={Whatsapp} className="btn btn-success">Book Now  <i className="fab fa-whatsapp"></i></a></p>
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex">
          <div className="col-md-4 d-flex">
          	<div className="blog-entry justify-content-end">
              <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('img/rangewhite.jpg')"}}>
              </a>
              <div className="text pt-4">
              	<div className="meta mb-3">
         
                </div>
                <h3 className="heading mt-2"><a >Range Rover</a></h3>
                <p><a href="https://api.whatsapp.com/send?phone=+233242648325&text=Hello i need a car to rent"className="btn btn-success" >Book Now  <i className="fab fa-whatsapp"></i></a></p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
          	<div className="blog-entry justify-content-end">
              <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('img/camry1.jpg')"}}>
              </a>
              <div className="text pt-4">
              	<div className="meta mb-3">
         
                </div>
                <h3 className="heading mt-2"><a >Toyota Camry</a></h3>
                <p><a href={Whatsapp} className="btn btn-success" >Book Now  <i className="fab fa-whatsapp"></i></a></p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
          	<div className="blog-entry">
              <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('img/red back.jpeg')"}}>
              </a>
              <div className="text pt-4">
              	<div className="meta mb-3">
         
                </div>
                <h3 className="heading mt-2"><a >Toyota Corolla</a></h3>
                <p><a href="https://api.whatsapp.com/send?phone=+233242648325&text=Hello i need a car to rent"className="btn btn-success" >Book Now  <i className="fab fa-whatsapp"></i></a></p>
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex">
          <div className="col-md-4 d-flex">
          	<div className="blog-entry justify-content-end">
              <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('img/hilux.jpeg')"}}>
              </a>
              <div className="text pt-4">
              	<div className="meta mb-3">
         
                </div>
                <h3 className="heading mt-2"><a >Toyota Hilux</a></h3>
                <p><a href="https://api.whatsapp.com/send?phone=+233242648325&text=Hello i need a car to rent"className="btn btn-success">Book Now  <i className="fab fa-whatsapp"></i></a></p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
          	<div className="blog-entry justify-content-end">
              <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('img/prado.jpg')"}}>
              </a>
              <div className="text pt-4">
              	<div className="meta mb-3">
         
                </div>
                <h3 className="heading mt-2"><a >Land Cruiser Prado</a></h3>
                <p><a href={Whatsapp}className="btn btn-success">Book Now  <i className="fab fa-whatsapp"></i></a></p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
          	<div className="blog-entry">
              <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('img/coach.png')"}}>
              </a>
              <div className="text pt-4">
              	<div className="meta mb-3">
         
                </div>
                <h3 className="heading mt-2"><a >Travel Bus</a></h3>
                <p><a  href={Whatsapp}className="btn btn-success">Book Now  <i className="fab fa-whatsapp"></i></a></p>

              </div>
            </div>
          </div>
        </div>
    	</div>
    </section>

    <section className="ftco-section ftco-about" id="aboutus">
			<div className="container">
				<div className="row no-gutters">
					<div className="col-md-6 p-md-5 img img-2 d-flex justify-content-center align-items-center" style={{backgroundImage: "url('fonts/images/about.jpg')"}}>
					</div>
					<div className="col-md-6 wrap-about" >
	          <div className="heading-section heading-section-white pl-md-5">
	          	<h1 className="subheading">About us</h1>
	            <h2 className="mb-4">We Are Trusted Car Rental Company</h2>

	            <p className="text-dark" id="aboutdetails">Our Company has been in existence for years with <strong>zero complains and negative reports.</strong> <br />When it comes to  affordability,safety and quality service,We are comparatively the best car rental company nation wide.
                    All Our Cars are in good shape and trucked to ensure maximum security</p>
                    <h2 className="mb-4">Why Ride with Us</h2>
	            <p className="text-dark" id="aboutdetails"> We play a vital role in providing convenient transportation solutions for travelers, tourists, individuals in need of temporary vehicles, or those whose personal vehicles are undergoing repairs. We are capable of offering a wide range of vehicles and flexible rental options making as the number one choice for various needs and situations. Some of our vehicles include CAMRY,HONDA,COROLLA,TOYOTA LAND CRUISER V8,PICK UP, LEXUS,PRADO HIGHLANDER,BUSES AND VANS.</p>
	            <p><a href="#newbooking" className="btn btn-primary py-3 px-4">Book Now</a></p>
	          </div>
					</div>
				</div>
			</div>
		</section>

		<section className="ftco-section">
			<div className="container">
				<div className="row justify-content-center mb-5">
          <div className="col-md-7 text-center heading-section">
          	<span className="subheading">Services</span>
            <h2 className="mb-3">Our Latest Services</h2>
          </div>
        </div>
				<div className="row">
					<div className="col-md-3">
						<div className="services services-2 w-100 text-center">
            	<div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-wedding-car"></span></div>
            	<div className="text w-100">
                <h3 className="heading mb-2">Wedding Ceremony</h3>
                <p className="font-weight-normal">The wedding day is an unforgettable moment on the calendar for the bride and groom. Therefore, we just want that day to be ‘perfect’. Regardless of your budget for car rentals.</p>
              </div>
            </div>
					</div>
					<div className="col-md-3">
						<div className="services services-2 w-100 text-center">
            	<div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-transportation"></span></div>
            	<div className="text w-100">
                <h3 className="heading mb-2">City Transfer</h3>
                <p className="font-weight-normal">ll you have to do is to contact us and we will provide you with a vehicle that will take you comfortably and safely to the given destination..</p>
              </div>
            </div>
					</div>
					<div className="col-md-3">
						<div className="services services-2 w-100 text-center">
            	<div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-car"></span></div>
            	<div className="text w-100">
                <h3 className="heading mb-2">Airport Transfer</h3>
                <p className="font-weight-normal">We also provide additional service such as - transfer to the airports in the Country.Depending on the take off time, you can order a ride to the airport </p>
              </div>
            </div>
					</div>
					<div className="col-md-3">
						<div className="services services-2 w-100 text-center">
            	<div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-transportation"></span></div>
            	<div className="text w-100">
                <h3 className="heading mb-2">Whole City Tour</h3>
                <p  className="font-weight-normal">Your comfort is a top priority. That's why we offer chauffeured car rentals within the Country. We deliver the exact make and model of the car you desire straight to you. All for a fair price, too!.</p>
              </div>
            </div>
					</div>
				</div>
			</div>
		</section>

		<section className="ftco-section ftco-intro" style={{backgroundImage: "url('img/Clients/handlekeys.png')"}}>
			<div className="overlay"></div>
			<div className="container">
				<div className="row justify-content-end">
					<div className="col-md-6 heading-section heading-section-white">
            <h2 className="mb-3 text-black">Who’s driving? Are you having your own driver or you would use the services of the company’s drivers?</h2>
            <a  className="btn btn-primary btn-lg" href="#newbooking">Book Now</a>
          </div>
				</div>
			</div>
		</section>


    <section className="ftco-section testimony-section bg-light">
      <div className="container" id="contactus">
        <div className="row justify-content-center mb-5">
          <div className="col-md-7 text-center heading-section">
          	<span className="subheading">Contact</span>
            <h2 className="mb-3">Contact Us</h2>
            <div className="h-10 d-inline-flex align-items-center mb-10">
                    <a className="btn btn-sm-square bg-white text-primary me-1" href={Whatsapp}><i className="fab fa-whatsapp"></i></a>
                    <a className="btn btn-sm-square bg-white text-primary me-1" href="https://web.facebook.com/NMensahRentals"><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-sm-square bg-white text-primary me-1" href="https://www.instagram.com/nmensahcarrentals/"><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-sm-square bg-white text-primary me-0" href=""><i className="fab fa-instagram"></i></a>
                </div>
            <div className="container-fluid  wow fadeInUp" data-wow-delay="0.1s" id="mapframe">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7925.306761821768!2d-1.5983670719546128!3d6.6897849790737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb952ab803362b%3A0x1935dfe5c175b5ba!2sN.%20MENSAH%20CAR%20RENTALS!5e0!3m2!1sen!2sgh!4v1690543879604!5m2!1sen!2sgh" width="1200" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
        <div className="row">

        </div>
      </div>
    </section>

    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-7 heading-section text-center">
          	{/* <span className="subheading">Blog</span> */}
            <h2>What Our Clients Say</h2>
          </div>
        </div>
        <div className="row d-flex">
          <div className="col-md-4 d-flex">
          	<div className="blog-entry justify-content-end">
              <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('img/Clients/woman.jpg')"}}>
              </a>
              <div className="text pt-4">
              	<div className="meta mb-3">
                  {/* <div><a  className="meta-chat"><span className="icon-chat"></span> 3</a></div> */}
                </div>
                <h3 className="mt-2" id="client1"><a >Fantastic Reception and on time Delivery.Drivers are of high Performance and well Trained.I got to my Destination without any Difficulties</a></h3>
                {/* <p><a  className="btn btn-primary">Book Now</a></p> */}
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
          	<div className="blog-entry justify-content-end">
              <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('img/Clients/thinkman.jpg')"}}>
              </a>
              <div className="text pt-4">
              	<div className="meta mb-3">
                  {/* <div><a  className="meta-chat"><span className="icon-chat"></span> 3</a></div> */}
                </div>
                <h3 className="mt-2" id="client1"><a >It was a relaxed and a Comfortable Ride as well as Comparatively Cheaper. No matter your budget,you will definitely have a suitable car to Rent</a></h3>
                {/* <p><a  className="btn btn-primary">Book Now</a></p> */}
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
          	<div className="blog-entry">
              <a href="blog-single.html" className="block-20" style={{backgroundImage: "url('img/Clients/family.jpg')"}}>
              </a>
              <div className="text pt-4">
              	<div className="meta mb-3">
                  {/* <div><a  className="meta-chat"><span className="icon-chat"></span> 3</a></div> */}
                </div>
                <h3 className="mt-2" id="client1"><a >Friends and Family were talking about thier Brand New High Performing Vehicles.Now I know its a fact.Just Rent and show Appreciation</a></h3>
                {/* <p><a  className="btn btn-primary">Book Now</a></p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>	

    <section className="ftco-counter ftco-section img bg-light" id="section-counter">
			<div className="overlay"></div>
    	<div className="container">
    		<div className="row">
          <div className="col-md-6 col-lg-3 justify-content-center counter-wrap">
            <div className="block-18">
              <div className="text text-border d-flex align-items-center">
                <strong className="number" data-number="60">5</strong>
                <span>Years <br />Experienced</span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 justify-content-center counter-wrap">
            <div className="block-18">
              <div className="text text-border d-flex align-items-center">
                <strong className="number" data-number="1090">100</strong>
                <span> Different<br />Cars</span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 justify-content-center counter-wrap">
            <div className="block-18">
              <div className="text text-border d-flex align-items-center">
                <strong className="number" data-number="2590">200</strong>
                <span>Happy <br />Customers</span>
              </div>
            </div>
          </div>
          {/* <div className="col-md-6 col-lg-3 justify-content-center counter-wrap">
            <div className="block-18">
              <div className="text d-flex align-items-center">
                <strong className="number" data-number="67">2</strong>
                <span>Total <br />Branches</span>
              </div>
            </div>
          </div> */}
        </div>
    	</div>
    </section>	

    <footer className="ftco-footer ftco-bg-dark ftco-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              {/* <h2 className="ftco-heading-2"><a  className="logo">Car<span>book</span></a></h2> */}
              <p>{Location}</p>
              <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                <li className=""><a  href={Whatsapp}><span className="icon-whatsapp"></span></a></li>
                <li className=""><a href={Facebook} ><span className="icon-facebook"></span></a></li>
                <li className=""><a href={Instagram} ><span className="icon-instagram"></span></a></li>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4 ml-md-5">
              <h2 className="ftco-heading-2">Information</h2>
              <ul className="list-unstyled">
                <li><a  className="py-2 d-block">About</a></li>
                <li><a  className="py-2 d-block">Services</a></li>
                <li><a  className="py-2 d-block">Term and Conditions</a></li>
                <li><a  className="py-2 d-block">Best Price Guarantee</a></li>
                <li><a  className="py-2 d-block">Privacy &amp; Cookies Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md">
             <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Customer Support</h2>
              <ul className="list-unstyled">
                <li><a  className="py-2 d-block">FAQ</a></li>
                <li><a  className="py-2 d-block">Payment Option</a></li>
                <li><a  className="py-2 d-block">Booking Tips</a></li>
                <li><a  className="py-2 d-block">How it works</a></li>
                <li><a  className="py-2 d-block">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
            	<h2 className="ftco-heading-2">Have a Questions?</h2>
            	<div className="block-23 mb-3">
	              <ul>
	                <li><span className="icon icon-map-marker"></span><span className="text">{Location}</span></li>
	                <li><a ><span className="icon icon-phone"></span><span className="text">{Mobile}</span></a></li>
	                <li><a ><span className="icon icon-envelope"></span><span className="text">{Emails}</span></a></li>
	              </ul>
	            </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">

            {/* <p><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
  Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved |
  {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p> */}
          </div>
        </div>
      </div>
    </footer>
    
  {/* <div id="ftco-loader" className="show fullscreen"><svg className="circular" width="48px" height="48px"><circle className="path-bg" cx="24" cy="24" r="22" fill="none" /><circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"/></svg></div> */}

  
  </>
)
}
  
  