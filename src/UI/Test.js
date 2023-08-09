import React from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FinalDate } from "./Date";
import axios from "axios";

const Tested=()=>{
    const [Data,setData]=useState([])
    

    const navigate=useNavigate()
    const AdminKey="NMCRRiggedkey!"

    let {id}=useParams()
    
const DashBoardAccess=()=>{
     id == AdminKey ? navigate('/test') : navigate('/access/')
    return id

}

            // useEffect(() => {
            //     alert(id)
            //     id == AdminKey ? navigate('/test/'+id) : navigate('/access')
            //    return id
             
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
                        <h1 className="mb-4">Enter Administrative Key</h1>
                       
                        <form onSubmit={DashBoardAccess}>           
                                <div className="col-12">
                                    <button className="btn btn-primary w-100 py-3" type="submit">Get Access</button>
                                </div>                            
                            
                        </form>
                    </div>
                </div>
                </div>
                </div>
        
        </>
    )
}

export default Tested;