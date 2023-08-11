import React from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState,useEffect } from "react";
import { FinalDate } from "./Date";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'
import { DBURL } from "../DBUrl";

 const MainPage=()=>{
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

    const {id}=useParams()
    const navigate=useNavigate()
    const form = useRef();
    const newBooking="new booking made please check dashboard"


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

    const SubmitBooking=(e)=>{
    e.preventDefault();
    axios.post(DBURL,{Bookid,Fullname,Address,Telephone,Purpose,Amount,Cartype,BookingDate,DeliveryDate,Days,PaymentStatus,ConfirmPayment,Email,Service,DeliveryTime}).
    then((res)=>{
        Swal.fire({
            title: 'Do you want Save this Booking ?',
            showDenyButton: true,
            showCancelButton: true,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
               // alert('saved successfully')
generateInvoice();
sendEmail();
      
        
              Swal.fire('Saved', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })


    }).catch((err)=>{
      throw err
    })
    
    }

    const generateInvoice=()=>{
        const FindCode={
            Telephone:Telephone,
            Bookid:Bookid,

        }
       
        axios.get(DBURL,{params:FindCode}).
        then((res)=>{
            navigate('/invoice/'+res.data[0].id)
            
          console.log(res.data)
         // alert(res.data[0].Fullname)
    
        }).catch((err)=>{
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
<div className="container-fluid bg-light d-none d-lg-block">
        <div className="row align-items-center top-bar">
            <div className="col-lg-3 col-md-12 text-center text-lg-start">
                <a href="" className="navbar-brand m-0 p-0">
                    <h1 className="text-primary m-0" style={{fontSize:30}}>N MENSAH CAR RENTALS</h1>
                </a>
            </div>
            <div className="col-lg-9 col-md-12 text-end">
                <div className="h-100 d-inline-flex align-items-center me-4">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                    <p className="m-0">P.O BOX SE 1727 SUAME(KSI)</p>
                </div>
                <div className="h-100 d-inline-flex align-items-center me-4">
                    <i className="far fa-envelope-open text-primary me-2"></i>
                    <p className="m-0">baidoorichard454@gmail.com</p>
                </div>
                <div className="h-100 d-inline-flex align-items-center">
                <a className="btn btn-sm-square bg-white text-primary me-1" href="https://api.whatsapp.com/send?phone=+233242648325&text=Hello i need a car to rent"><i className="fab fa-whatsapp"></i></a>
                    <a className="btn btn-sm-square bg-white text-primary me-1" href="https://api.whatsapp.com/send?phone=+233242648325&text=Hello i need a car to rent"><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-sm-square bg-white text-primary me-1" href=""><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-sm-square bg-white text-primary me-0" href=""><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    </div>

    <div className="container-fluid nav-bar bg-light">
        <nav className="navbar navbar-expand-lg navbar-light bg-white p-3 py-lg-0 px-lg-4">
            <a href="" className="navbar-brand d-flex align-items-center m-0 p-0 d-lg-none">
                <h1 className="text-primary m-0">N MENSAH CAR RENTALS</h1>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="fa fa-bars"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav me-auto">
                    <a href="index.html" className="nav-item nav-link active">Home</a>
                    <a href="#aboutus" className="nav-item nav-link">About</a>
                    <a href="#occation" className="nav-item nav-link">Services</a>
                    <a href="#booking" className="nav-item nav-link">Booking</a>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Admin</a>
                        <div className="dropdown-menu fade-up m-0">
                            <a href="/access" className="dropdown-item">Get Access</a>
                            {/* <a href="/display" className="dropdown-item">Login</a> */}
                        </div>
                    </div>
                    <a href="#contactus" className="nav-item nav-link">Contact Us</a>
                </div>
                <div className="mt-4 mt-lg-0 me-lg-n4 py-3 px-4 bg-primary d-flex align-items-center">
                    <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{width: 45, height: 45,}}>
                        <i className="fa fa-phone-alt text-primary"></i>
                    </div>
                    <div className="ms-3">
                        <p className="mb-1 text-white">Emergency 24/7</p>
                        <h5 className="m-0 text-secondary">0242648325-0244491738</h5>
                    </div>
                </div>
            </div>
        </nav>
    </div>
	<div className="banner_section layout_padding">
		<div className="container">
			<h1 className="best_taital">YOUR TRUSTED CHOICE FOR RELIABLE CAR RENTALS</h1>
		
		    <div className="bt_main">
		    	<div  id="dbt" className="discover_bt"><a btn btn-success href="#booking" id="atag"><i className="fa fa-book"></i>  BOOK NOW</a></div>
                <div id="dbt" className="discover_bt"><a id="atag" href="https://api.whatsapp.com/send?phone=+233242648325&text=Hello i need a car to rent"><i className="fab fa-whatsapp"></i>   CHART US</a></div>
		    </div>
		</div>
	</div>

   
    <div className="container-xxl py-5" id="occation">
        <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              
                <h1 className="mb-5" id="available">Rent a Car for All Occasions</h1>
            </div>
            <div className="row g-4">
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="team-item">
                        <div className="position-relative overflow-hidden">
                            <img className="img-fluid" src="img/marriage.jpg" alt="" />
                        </div>
                        <div className="team-text">
                            <div className="bg-light">
                                <h5 className="fw-bold mb-0">Marriage Ceremony</h5>
                            
                            </div>
                            <div className="bg-primary">
                            <button className="btn btn-warning border border-warning rounded-left" id="btnbook">Book Now<a className="btn btn-square mx-1" href="#booking"><i className="fa fa-book"></i></a></button>
                               <button className="btn btn-success border border-warning rounded-left" id="btnchart">Chart Now<a className="btn btn-square mx-1" href="https://api.whatsapp.com/send?phone=+233242648325&text=Hello i need a car to rent"><i className="fab fa-whatsapp"></i></a></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="team-item">
                        <div className="position-relative overflow-hidden">
                            <img className="img-fluid" src="img/funeral.jpg" alt="" />
                        </div>
                        <div className="team-text">
                            <div className="bg-light">
                                <h5 className="fw-bold mb-0">Funeral</h5>
                                
                            </div>
                            <div className="bg-primary">
                            <button className="btn btn-warning border border-warning rounded-left" id="btnbook">Book Now<a className="btn btn-square mx-1" href="#booking"><i className="fa fa-book"></i></a></button>
                               <button className="btn btn-success border border-warning rounded-left" id="btnchart">Chart Now<a className="btn btn-square mx-1" href="https://api.whatsapp.com/send?phone=+233242648325&text=Hello i need a car to rent"><i className="fab fa-whatsapp"></i></a></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="team-item">
                        <div className="position-relative overflow-hidden">
                            <img className="img-fluid" src="img/tour.jpg" alt="" />
                        </div>
                        <div className="team-text">
                            <div className="bg-light">
                                <h5 className="fw-bold mb-0">Tourism</h5>
                                
                            </div>
                            <div className="bg-primary">
                            <button className="btn btn-warning border border-warning rounded-left" id="btnbook">Book Now<a className="btn btn-square mx-1" href="#booking"><i className="fa fa-book"></i></a></button>
                               <button className="btn btn-success border border-warning rounded-left" id="btnchart">Chart Now<a className="btn btn-square mx-1" href="https://api.whatsapp.com/send?phone=+233242648325&text=Hello i need a car to rent"><i className="fab fa-whatsapp"></i></a></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                    <div className="team-item">
                        <div className="position-relative overflow-hidden" id="party">
                            <img className="img-fluid" src="img/party.jpg" alt="" />
                        </div>
                        <div className="team-text">
                            <div className="bg-light">
                                <h5 className="fw-bold mb-0">Entertainment</h5>
                            
                            </div>
                            <div className="bg-primary">
                            <button className="btn btn-warning border border-warning rounded-left" id="btnbook">Book Now<a className="btn btn-square mx-1" href="#booking"><i className="fa fa-book"></i></a></button>
                               <button className="btn btn-success border border-warning rounded-left" id="btnchart">Chart Now<a className="btn btn-square mx-1" href="https://api.whatsapp.com/send?phone=+233242648325&text=Hello i need a car to rent"><i className="fab fa-whatsapp"></i></a></button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

{/* 
<!-- Fact Start --> */} 
<div className="container-xxl py-5 animated animate__fadeIn">
<h1 className="mb-4" id="available">SOME AVAILABLE CARS FOR RENT</h1>
        <div className="container">
       
            <div className="row g-4">
                <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp animated animate__fadeIn" data-wow-delay="0.1s">
                    <div className="overflow-hidden">
                        <img className="img-fluid w-100 h-100" src="img/cruiser.jpg" alt="" />
                    </div>
                    <div className="d-flex align-items-center justify-content-between bg-light p-4">
                        <h5 className="text-truncate me-3 mb-0">Toyota Land Cruiser</h5>
                        <a className="btn btn-square btn-outline-primary border-2 border-white flex-shrink-0" href=""></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp" data-wow-delay="0.3s">
                    <div className="overflow-hidden">
                        <img className="img-fluid w-100 h-100" src="img/cruiseback.jpeg" alt="" />
                    </div>
                    <div className="d-flex align-items-center justify-content-between bg-light p-4">
                        <h5 className="text-truncate me-3 mb-0">Land Cruiser V8</h5>
                        <a className="btn btn-square btn-outline-primary border-2 border-white flex-shrink-0" href=""></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp" data-wow-delay="0.5s">
                    <div className="overflow-hidden">
                        <img className="img-fluid w-100 h-100" src="img/hilux.jpeg" alt="" />
                    </div>
                    <div className="d-flex align-items-center justify-content-between bg-light p-4">
                        <h5 className="text-truncate me-3 mb-0">Toyota Pick up</h5>
                        <a className="btn btn-square btn-outline-primary border-2 border-white flex-shrink-0" href=""></a>
                    </div>
                </div>
            </div>
        </div>

        <div className="container">
            <div className="row g-4">
                <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp" data-wow-delay="0.1s">
                    <div className="overflow-hidden">
                        <img className="img-fluid w-100 h-100" src="img/rangewhite.jpg" alt="" />
                    </div>
                    <div className="d-flex align-items-center justify-content-between bg-light p-4">
                        <h5 className="text-truncate me-3 mb-0">Range Rover</h5>
                        <a className="btn btn-square btn-outline-primary border-2 border-white flex-shrink-0" href=""></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp" data-wow-delay="0.3s">
                    <div className="overflow-hidden">
                        <img className="img-fluid w-100 h-100" src="img/ccivic.jpg" alt="" />
                    </div>
                    <div className="d-flex align-items-center justify-content-between bg-light p-4">
                        <h5 className="text-truncate me-3 mb-0">Honda Civic</h5>
                        <a className="btn btn-square btn-outline-primary border-2 border-white flex-shrink-0" href=""></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp" data-wow-delay="0.5s">
                    <div className="overflow-hidden">
                        <img className="img-fluid w-100 h-100" src="img/whitecruiser.jpg" alt="" />
                    </div>
                    <div className="d-flex align-items-center justify-content-between bg-light p-4">
                        <h5 className="text-truncate me-3 mb-0">Lexus</h5>
                        <a className="btn btn-square btn-outline-primary border-2 border-white flex-shrink-0" href=""></a>
                    </div>
                </div>
            </div>
        </div>



        <div className="container">
            <div className="row g-4">
                <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp" data-wow-delay="0.1s">
                    <div className="overflow-hidden" id="camry">
                        <img className="img-fluid w-100 h-100" src="img/coach.png" alt="" />
                    </div>
                    <div className="d-flex align-items-center justify-content-between bg-light p-4">
                        <h5 className="text-truncate me-3 mb-0">Travel Bus</h5>
                        <a className="btn btn-square btn-outline-primary border-2 border-white flex-shrink-0" href=""><i className=""></i></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp" data-wow-delay="0.3s">
                    <div className="overflow-hidden" id="camry">
                        <img className="img-fluid w-100 h-100" src="img/camry2.jpg" alt="" />
                    </div>
                    <div className="d-flex align-items-center justify-content-between bg-light p-4">
                        <h5 className="text-truncate me-3 mb-0">Toyota Camry</h5>
                        <a className="btn btn-square btn-outline-primary border-2 border-white flex-shrink-0" href=""><i className=""></i></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp" data-wow-delay="0.5s" >
                    <div className="overflow-hidden" id="camry">
                        <img className="img-fluid w-100 h-100" src="img/camry1.jpg" alt="" />
                    </div>
                    <div className="d-flex align-items-center justify-content-between bg-light p-4">
                        <h5 className="text-truncate me-3 mb-0">Nice Camry</h5>
                        <a className="btn btn-square btn-outline-primary border-2 border-white flex-shrink-0" href=""><i className=""></i></a>
                    </div>
                </div>
            </div>
        </div>

        
        <div className="container">
            <div className="row g-4">
                <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp" data-wow-delay="0.1s">
                    <div className="overflow-hidden" id="camry">
                        <img className="img-fluid w-100 h-100" src="img/inside1.jpg" alt="" />
                    </div>
                    <div className="d-flex align-items-center justify-content-between bg-light p-4">
                        <h5 className="text-truncate me-3 mb-0">Good Interior</h5>
                        <a className="btn btn-square btn-outline-primary border-2 border-white flex-shrink-0" href=""><i className=""></i></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp" data-wow-delay="0.3s">
                    <div className="overflow-hidden" id="camry">
                        <img className="img-fluid w-100 h-100" src="img/inside2.jpg" alt="" />
                    </div>
                    <div className="d-flex align-items-center justify-content-between bg-light p-4">
                        <h5 className="text-truncate me-3 mb-0">Nice Interior</h5>
                        <a className="btn btn-square btn-outline-primary border-2 border-white flex-shrink-0" href=""><i className=""></i></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 service-item-top wow fadeInUp" data-wow-delay="0.5s" >
                    <div className="overflow-hidden" id="camry">
                        <img className="img-fluid w-100 h-100" src="img/inside3.jpg" alt="" />
                    </div>
                    <div className="d-flex align-items-center justify-content-between bg-light p-4">
                        <h5 className="text-truncate me-3 mb-0">Comfortable Ride</h5>
                        <a className="btn btn-square btn-outline-primary border-2 border-white flex-shrink-0" href=""><i className=""></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Service End -->


    <!-- About Start --> */}
    <div className="container-xxl py-5" id="aboutus">
        <div className="container">
            <div className="row g-5">
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                    <h6 className="text-secondary text-uppercase">About Us</h6>
                    <h1 className="mb-4">We Are Trusted Car Rental Company</h1>
                    <p className="mb-4" id="about">Our Company has been in existence for years with <strong>zero complains and negative reports.</strong> <br />When it comes to  affordability,safety and quality service,We are comparatively the best car rental company nation wide.
                    All Our Cars are in good shape and trucked to ensure maximum security.
                    <h1 className="mb-4">Why Ride with Us</h1>
                    We play a vital role in providing convenient transportation solutions for travelers, tourists, individuals in need of temporary vehicles, or those whose personal vehicles are undergoing repairs. We are capable of offering a wide range of vehicles and flexible rental options making as the number one choice for various needs and situations. Some of our vehicles include CAMRY,HONDA,COROLLA,TOYOTA LAND CRUISER V8,PICK UP, LEXUS,PRADO HIGHLANDER,BUSES AND VANS.
                    </p>
                    <p className="fw-medium text-primary"><i className="fa fa-check text-success me-3"></i>Residential & commercial Renting service</p>
                    <p className="fw-medium text-primary"><i className="fa fa-check text-success me-3"></i>Quality services at affordable prices</p>
                    <p className="fw-medium text-primary"><i className="fa fa-check text-success me-3"></i>Immediate 24/ 7 emergency services</p>
                    <div className="bg-primary d-flex align-items-center p-4 mt-5">
                        <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: 60, height: 60, }}>
                            <i className="fa fa-phone-alt fa-2x text-primary"></i>
                        </div>
                        <div className="ms-3">
                            <p className="fs-5 fw-medium mb-2 text-white">Emergency 24/7</p>
                            <h3 className="m-0 text-secondary">0242648325-0244491738</h3>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 pt-4" style={{minHeight: 500,}}>
                    <div className="position-relative h-100 wow fadeInUp" data-wow-delay="0.5s">
                        <img className="position-absolute img-fluid w-100 h-100" src="img/rent.jpeg"  alt="" />
                        <img className="position-absolute start-0 bottom-0 img-fluid bg-white pt-2 pe-2 w-50 h-50" src="img/LOGO.jpeg"  alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- About End -->


    <!-- Fact Start --> */}
    <div className="container-fluid fact bg-dark my-5 py-5" id="factos">
        <div className="container">
            <div className="row g-4">
                <div className="col-md-6 col-lg-3 text-center wow fadeIn" data-wow-delay="0.1s">
                    <i className="fa fa-check fa-2x text-white mb-3"></i>
                    <h2 className="text-white mb-2" data-toggle="counter-up">More than 5</h2>
                    <p className="text-white mb-0">Years Experience</p>
                </div>
                <div className="col-md-6 col-lg-3 text-center wow fadeIn" data-wow-delay="0.3s">
                    <i className="fa fa-users-cog fa-2x text-white mb-3"></i>
                    <h2 className="text-white mb-2" data-toggle="counter-up">Abundant</h2>
                    <p className="text-white mb-0">Expert Drivers</p>
                </div>
                <div className="col-md-6 col-lg-3 text-center wow fadeIn" data-wow-delay="0.5s">
                    <i className="fa fa-users fa-2x text-white mb-3"></i>
                    <h2 className="text-white mb-2" data-toggle="counter-up">Over 1000</h2>
                    <p className="text-white mb-0">Satisfied Clients</p>
                </div>
                
            </div>
        </div>
    </div>
    {/* <!-- Fact End -->


   
    {/* <!-- Service End -->


    <!-- Booking Start --> */}
    <div className="container-fluid my-5 -0">
        <div className="video wow fadeInUp" data-wow-delay="0.1s">
            <button type="button" className="btn-play" data-bs-toggle="modal" data-src="img/addvideo.mp4" data-bs-target="#videoModal">
                <span></span>
            </button>

            <div className="modal fade" id="videoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">N Mensah Car Rentals</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                     
                            <div className="ratio ratio-16x9">
         <video controls  autoplay src="img/addvideo.mp4" type="video/mp4" >
    </video>
                                {/* <iframe className="embed-responsive-item" src="img/addvideo.mp4" id="video" allowFullScreen allowscriptaccess="always"
                                    allow="autoplay"></iframe> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="text-white mb-4">Where Safety Meets Comfort</h1>
            <h3 className="text-white mb-0">24 Hours 6 Days a Week</h3>
        </div>
        <div className="container position-relative wow fadeInUp" data-wow-delay="0.1s" style={{marginTop: -6}} id="booking">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="bg-light text-center p-5">
                        <h1 className="mb-4">Book For a Service</h1>
                        <p style={{color:'green',fontSize:'20px'}}>After filling this form,please send the commitment or full payment to mobile money number-<strong style={{color:'black',fontSize:'20px'}}>0244491738.(Account name-Mensah Nicholas).</strong>
                        wait for a confirmation call and reprint booking invoice</p>
                        {/* <form ref={form} onSubmit={sendEmail}> */}
                         <form ref={form} onSubmit={SubmitBooking}>
                
                            <div className="row g-3">
                            <div className="col-12 col-sm-6">
                            <textarea name="message" value={newBooking} hidden />
                            {/* <input type="text" name="message"  className="form-control border-0" placeholder="Bookingid"  style={{height: 55,}} disabled value={newBooking}  />  */}
                        <label className="for" >Booking Code</label>
                        <input type="text"   className="form-control border-0" placeholder="Bookingid"  style={{height: 55,}} disabled value={Bookid} onChange={e=>setBookid(e.target.value)} /> 
                        </div>
                        <div className="col-12 col-sm-6">
                                <label className="for" >Email</label>
                                    <input type="email" name="user_email" className="form-control border-0" placeholder="Email(@gmail.com)" style={{height: 55}} value={Email}  onChange={e=>setEmail(e.target.value)}/>
                                </div>
                                <div className="col-12 col-sm-6">
                                <label className="for" >Full Name</label>
                                    <input type="text" name="user_name" className="form-control border-0" placeholder="Your Name" style={{height: 55,}}  value={Fullname} onChange={e=>setFullname(e.target.value)} onKeyUpCapture={RandomKey}/>
                                </div>
                                <div className="col-12 col-sm-6">
                                <label className="for" >Telephone</label>
                                    <input type="number" className="form-control border-0" placeholder="Telephone Number" style={{height: 55}} value={Telephone}  onChange={e=>setTelephone(e.target.value)}/>
                                </div>
                        
                            
                                <div className="col-12 col-sm-6">
                                <label className="for" >Address</label>
                                    <div className="date" id="date1" data-target-input="nearest">
                                        <input type="text"
                                            className="form-control border-2"
                                            placeholder="Address" data-target="#date1"  style={{height: 55}} value={Address} onChange={e=>setAddress(e.target.value)}/>
                                    </div>
                                   
                                </div>
                                <div className="col-12 col-sm-6">
                                <label className="for" >Purpose</label>
                              
                                    <input type="text" className="form-control border-0" placeholder="Purpose(Example-for Wedding or Tourism)" style={{height: 55}}  value={Purpose}  onChange={e=>setPurpose(e.target.value)}/>
                                    
                                   
                                </div>
                                <div className="col-12 col-sm-6">                                   
                                
                                <div className="row">
                                
                                <div className="col-6">
                                <label className="for" >Pick Up Date</label>
                                <input type="date"  className="form-control border-0" placeholder="MM/DD/YYYY"  style={{height: 55}} value={DeliveryDate}  onChange={e=>setDeliveryDate(e.target.value)}/>
                                </div>
                                <div className="col-6">
                                <label className="for" >Pick Up Time</label>
                                <input type="time"  className="form-control border-0" placeholder="-:-:-"  style={{height: 55}} value={DeliveryTime}  onChange={e=>setDeliveryTime(e.target.value)}/>
                                </div>
                                </div>
                                </div>
                                
                                <div className="col-12 col-sm-6">
                                <label className="for" >No. of Days Hired</label>
                                <input type="number" className="form-control border-0" placeholder="No. of Days Hired" style={{height: 55}} value={Days}  onChange={e=>setDays(e.target.value)}/>
                                </div>
                                <div className="col-12 col-sm-6">
                                <label className="text-sm-2" >Car Type</label>
                                <input type="text" className="form-control border-0" placeholder="Enter Type of Car Example(Land Cruiser)" value={Cartype} style={{height: 55}} onChange={e=>setCartype(e.target.value)}/>
                                </div>
                                <div className="col-12 col-sm-6">
                                <label className="for" >Amount(Full Payment/Commitment Fee)</label>
                                <input type="number" className="form-control border-0" placeholder="Enter Amount" style={{height: 55}} value={Amount}  onChange={e=>setAmount(e.target.value)}/>
                                </div>
                                
     
                                <div className="col-12 ">                                   
                                
                                <div className="row">
                                <div className="col-6">
                                <button className="btn btn-primary w-100 py-3" type="submit">Book Now</button>
                                </div>
                                <div className="col-6">
                                <button className="btn btn-warning w-100 py-3" type="button"> <a href="/code">Reclaim Booking Code</a></button>
                                </div>
                                </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Booking End -->


    <!-- Team Start --> */}
    
    {/* <!-- Team End -->


    <!-- Testimonial Start --> */}
    <div className="container fadeInUp" data-wow-delay="0.1s" id="contactus">
        <div className="container">
            <div className="text-center">
                <h6 className="text-secondary text-uppercase">Contact Us</h6>
                <h1 className="mb-5">Locate Us</h1>
            </div>
            <div className="container  wow fadeInUp" data-wow-delay="0.1s">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7925.306761821768!2d-1.5983670719546128!3d6.6897849790737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb952ab803362b%3A0x1935dfe5c175b5ba!2sN.%20MENSAH%20CAR%20RENTALS!5e0!3m2!1sen!2sgh!4v1690543879604!5m2!1sen!2sgh" width="1200" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
            </div>
        </div>
    </div>
    {/* <!-- Testimonial End -->


    <!-- Footer Start --> */}
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

export default MainPage;