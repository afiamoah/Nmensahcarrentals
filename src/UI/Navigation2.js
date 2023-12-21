import React from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState,useEffect } from "react";
import { FinalDate } from "./Date";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

 const Navigation=()=>{
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
    axios.post('http://localhost:5000/bookings',{Bookid,Fullname,Address,Telephone,Purpose,Amount,Cartype,BookingDate,DeliveryDate,Days,PaymentStatus,ConfirmPayment,Email,Service,DeliveryTime}).
    then((res)=>{
alert('saved successfully')
generateInvoice()
      console.log(res)

    }).catch((err)=>{
      throw err
    })
    
    }

    const generateInvoice=()=>{
        const FindCode={
            Telephone:Telephone,
            Bookid:Bookid,

        }
       
        axios.get('http://localhost:5000/bookings/',{params:FindCode}).
        then((res)=>{
            navigate('/invoice/'+res.data[0].id)
            
          console.log(res.data)
          alert(res.data[0].Fullname)
    
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


    {/* <div className="container-fluid nav-bar bg-light">
        <nav className="navbar navbar-expand-lg navbar-light bg-white p-3 py-lg-0 px-lg-4">
            <a href="" className="navbar-brand d-flex align-items-center m-0 p-0 d-lg-none">
                <h4 className="text-primary m-0">N MENSAH CAR RENTALS</h4>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="fa fa-bars"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav me-auto">
                    <a href="/" className="nav-item nav-link active">Home</a>
                    <a href="/newbook" className="nav-item nav-link">New Booking</a>
                    <a href="/dashboard" className="nav-item nav-link">Dashboard</a>
                    
                </div>
               
            </div>
        </nav>
    </div> */}
	
	  <nav className="navbar navbar-dark ftco_navbar bg-dark ftco-navbar-light">
	    <div className="container">
	      <a className="navbar-brand" href="index.html">N MENSAH <span> CAR RENTALS</span></a>
	      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
	        <span className="oi oi-menu"></span> Menu
	      </button>

	      <div className="collapse navbar-collapse" id="ftco-nav">
	        <ul className="navbar-nav ml-auto">
	          <li className="nav-item active"><a href="/" className="nav-link">Home</a></li>
	          <li className="nav-item"><a href="#newbooking" className="nav-link">Rent a Car Now</a></li>
	          <li className="nav-item"><a href="/admin" className="nav-link">Dashboard</a></li>
	           <li className="nav-item"><a href="car.html" className="nav-link">Contact Us</a></li>
	          <li className="nav-item"><a href="#aboutus" className="nav-link">About Us</a></li>
	          <li className="nav-item"><a href="contact.html" className="nav-link">Reigister</a></li>
	        </ul>
	      </div>
	    </div>
	  </nav>

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

export default Navigation;