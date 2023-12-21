//import logo from './logo.svg';
import './UI/frontenddesign/frontend.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
//import './App.css';
import './assets/css/style.css'
import './assets/css/front.css'
import './assets/css/bootstrap.min.css'
import './assets/lib/animate/animate.min.css'
import './assets/lib/animate/animate.min.css'
import './assets/css/sb-admin-2.css'
import './assets/css/sb-admin-2.min.css'
import './vendor/fontawesome-free/css/all.min.css'
import './assets/lib/owlcarousel/assets/owl.carousel.min.css'
import './assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css'
import 'animate.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import DisplayBooking from './UI/Display';
import MainPage from './UI/Main';
import EditData from './UI/EditRecords';
import BookingCode from './UI/BookingCode';
import Invoice from './UI/BookInvoice';
import AdminAccess from './UI/AdminAccess';
import Tested from './UI/Test';
import DashBoard from './UI/Dashboard';
import NewBook from './UI/NewBooking';
import DisplayBookingMobile from './UI/DisplaySmall';
import { FrontEnd } from './UI/frontend';
import { TryImages } from './UI/myimages';
import GetRevenue from './UI/Finance/Revenue';

function App() {
  return (
    <div className="App"> 
  <BrowserRouter>
  <Routes>
    {/* <Route path='/' element=  {<MainPage />}></Route> */}
    <Route path='/' element=  {<FrontEnd />}></Route>
    {/* <Route path='/' element=  {<TryImages />}></Route> */}
    <Route path='/edit/:id' element={<EditData />}></Route>
    <Route path='/code' element={<BookingCode/>}></Route>
    <Route path='/invoice/:id' element={<Invoice/>}></Route>
  <Route path='/display' element={<DisplayBooking/>}></Route>
  <Route path='/mobileview' element={<DisplayBookingMobile />}></Route>
  <Route path='/admin' element={<AdminAccess />}></Route>
  <Route path='/dashboard' element={<DashBoard />}></Route>
  <Route path='/newbook' element={<NewBook />}></Route>
  <Route path='/frontend' element={<FrontEnd />}></Route>
  <Route path='/myrevenue' element={<GetRevenue />}></Route>
  </Routes>
    </BrowserRouter> 
  </div>
  );

 
}

export default App;
