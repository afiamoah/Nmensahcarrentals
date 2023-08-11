import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FinalDate } from "./Date";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../assets/css/front.css'
import Navigation from "./Navigation";
import Swal from 'sweetalert2'
import { DBURL } from "../DBUrl";
const DisplayBooking = () => {
    const [Data,setData]=useState([])
    const [FilterRecords,setFilterRecords]=useState('')

    const [Fullname,setFullname]=useState('')
    const [Address,setAddress]=useState('')
    const [Telephone,setTelephone]=useState(233)
    const [Purpose,setPurpose]=useState('')
    const [Amount,setAmount]=useState('')
    const [Cartype,setCartype]=useState('')
    const [DeliveryDate,setDeliveryDate]=useState('')
    const [Days,setDays]=useState('')
    const [Bookid,setBookid]=useState('123ert')
    const [PaymentStatus,setPaymentStatus]=useState('Pending')
    const [ConfirmPayment,setConfirmPayment]=useState('')

    const navigate=useNavigate()
   




    const Delete=(id)=>{
        axios.delete(DBURL+id).
        then((res)=>{
            Swal.fire({
                title: 'Do you want Delete this Booking ?',
                showDenyButton: true,
                showCancelButton: true,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                   // alert('saved successfully')
          
            
                  Swal.fire('Cancelled', '', 'success')
                } else if (result.isDenied) {
                  Swal.fire('Changes are not deleted', '', 'info')
                }
              })
          console.log(res)
    
        }).catch((err)=>{
          throw err
        })
   
       }

       const EditData=(id)=>{
        navigate('/edit/'+id)
        
       }

    const columns = [
        {
            name: "ID",
            selector: row=> row.id,
            scroll:true

        },
        {
            name: "Name",
            selector: row=> row.Fullname
        },
        {
            name: "Booking Code",
            selector:row=> row.Bookid
        },
        {
            name: "Telephone",
            selector:row=> row.Telephone
        },
      

        {
            name: "Booking Date",
            selector:row=> row.BookingDate
        },
        
        {
            name: "Delivery Date",
            selector:row=> row.DeliveryDate
        },
        
        {
            name: "Delivery Time",
            selector:row=> row.DeliveryTime
        },

        {
            name: "Amount",
            selector:row=> row.Amount
        },

        {
            name: "Payment Status",
            selector:row=> row.PaymentStatus
        },

        {
            name: "Confirm Payment",
           selector: row=> row.ConfirmPayment

        },
        {
            name: "Service",
           selector: row=> row.Service,
           id:'servicesrow',

        },
    {
        name:"View",
        cell: ({id}) => {
            return (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    EditData(id);
                  }}
                >
                  View
                </button>
              </>
            );
           },
        },

        {
            name:"Delete",
            cell: ({id}) => {
                return (
                  <>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        Delete(id);
                      }}
                    >
                    Delete
                    </button>
                  </>
                );
               },
            }
    ]

    useEffect(() => {
      axios.get(DBURL).
      then((res)=>{
        const sorting=[...res.data]
        const sortedData = sorting.sort((a, b) => b.id - a.id);
         setData(sortedData)
         setFilterRecords(res.data)

      }).catch((err)=>{
        throw err
      })
    }, [])

    const allBookings=(e)=>{
        axios.get(DBURL).
        then((res)=>{
          const sorting=[...res.data]
          const sortedData = sorting.sort((a, b) => b.id - a.id);
           setData(sortedData)
           setFilterRecords(res.data)
  
        }).catch((err)=>{
          throw err
        })
    }

    const dayBookings=(e)=>{
      
    const newdata=FilterRecords.filter((row)=> {
        if(row.BookingDate ===FinalDate){
     return row
        }
    
    })
    
    setData(newdata) 
}

const pendingBookings=()=>{     
    const newdata=FilterRecords.filter((row)=> {
        if(row.ConfirmPayment ==="Pending"){
     return row
        }
    })   
    setData(newdata) 
}
           
    

    const filterSearchName=(e)=>{
        if(e.target.value!==''){
const newdata=FilterRecords.filter(row=> row.Fullname.toLowerCase().includes(e.target.value.toLowerCase()))

setData(newdata)
        }else{
            return Data
        }
    }

    
    const filterSearchNumber=(e)=>{
        if(e.target.value!==''){
const newdata=FilterRecords.filter(row=> row.Telephon.toLowerCase().includes(e.target.value.toLowerCase()))

setData(newdata)
        }else{
            return Data
        }
    }

    
const filterSearchDate=(e)=>{
        if(e.target.value!==''){
const newdata=FilterRecords.filter(row=> row.BookingDate.toLowerCase().includes(e.target.value.toLowerCase()))

setData(newdata)
        }else{
            return Data
        }
    }

    const filterSearchCode=(e)=>{
        if(e.target.value!==''){
const newdata=FilterRecords.filter(row=> row.Bookid.toLowerCase().includes(e.target.value.toLowerCase()))

setData(newdata)
        }else{
            return Data
        }
    }

    const btn={ 
         marginLeft:"80px"
        }
    
    return (

        <>
         < Navigation />
            <div>
                <div className="container-fluid" style={{display:'flex'}}>
                <button className="btn btn-success" onClick={allBookings} style={{height:'10', width:'200'}}>All Bookings</button>
                <button className="btn btn-success" onClick={dayBookings} style={btn}>Bookings for the Day</button>
                <button className="btn btn-success" onClick={pendingBookings} style={btn}>Pending Payments</button>
                </div>
            
                <div className="" style={{display:'flex', justifyContent:'space-between'}}>
          
                <input type="text" className="form-control border-2 m-5" placeholder="Search by Booking Code" onChange={filterSearchCode}/>  
                <input type="text" className="form-control border-2 m-5" placeholder="search by Client Name" onChange={filterSearchName}/>    
                <input type="number" className="form-control border-2 m-5"  placeholder="search by Telephone" onChange={filterSearchNumber}/>    
                <input type="text" className="form-control border-2 m-5" placeholder="Search by Date" onChange={filterSearchDate}/>    
                </div>
                <DataTable
                columns={columns}
                data={Data}
                pagination
                >

                </DataTable>
            </div>


        </>)
}

export default DisplayBooking