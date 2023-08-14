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
import { DBURL } from "../DBUrl";
import Swal from 'sweetalert2'
const DisplayBookingMobile = () => {
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
      axios.delete(DBURL+'/'+id).
      then((res)=>{
          Swal.fire({
              title: 'Do you want Delete this Booking ?',
              showDenyButton: true,
              showCancelButton: true,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                 // alert('saved successfully')
        
          
                Swal.fire('Deleted Successfully', '', 'success')
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
            name: "Name",
            selector: row=> row.Fullname
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
        name:"View",
        cell: ({id}) => {
            return (
              <>
                <button style={{backgroundColor:'white',color:'blue',border:'white',width:'80px'}}
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
                    <button style={{backgroundColor:'white',color:'red',border:'white',width:'80px'}}
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
        
         height:'100%', width:'100%',
         marginBottom:"10px",
         borderRadius:'7px'
        }

        const btns={ 
        
            height:'100%', width:'80%',
            marginBottom:"10px",
            borderRadius:'7px'
           }
    
    return (

        <>
        < Navigation />
            <div>
                <div className="container-fluid" style={{display:'flex',flexDirection:'column',justifyContent:"space-around",alignItems:"center",marginBottom:"10px"}}>
                <button className="btn btn-success" onClick={allBookings} style={btn}>All Bookings</button>
                <button className="btn btn-success" onClick={dayBookings} style={btn}>Bookings for the Day</button>
                <button className="btn btn-success" onClick={pendingBookings} style={btn}>Pending Payments</button>
                </div>
            
                <div className="container m-4">
          <div className="row mb-2">
<div className="col-6">
<input type="text" className="form-control border-2 m-2" placeholder="Search by Booking Code" onChange={filterSearchCode} style={btns}/>  
</div>
<div className="col-6">
<input type="text" className="form-control border-2 m-2" placeholder="search by Client Name" onChange={filterSearchName} style={btns}/>     
</div>
          </div>

          <div className="row">
<div className="col-6">
<input type="number" className="form-control border-2 m-2"  placeholder="search by Telephone" onChange={filterSearchNumber} style={btns}/>    
</div>
<div className="col-6">
 
<input type="text" className="form-control border-2 m-2" placeholder="Search by Date" onChange={filterSearchDate} style={btns}/> 
</div>
          </div>    
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

export default DisplayBookingMobile