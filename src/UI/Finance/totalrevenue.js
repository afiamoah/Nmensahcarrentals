import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import { Local} from "../../DBUrl";

const TotalRevenue=()=>{
    const [Trevenue,setTrevenue]=useState([])


    const GenerateFinalAmount=()=>{
        axios.post(Local+"totalrevenue")
        .then((res)=>{
            setTrevenue(res.data.total)
         
            
        }).catch((err)=>{
          
        })

    }

    useEffect(() => {
        GenerateFinalAmount();
    }, [])


    return(
    <>
    
 <span>{Trevenue}</span>  
   
    
    </>
    )

}

export default TotalRevenue;