import React from "react";
import { useState,useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import GetAllRevenue from "./revenuetablecolumns";
import { Local } from "../../DBUrl";

const GetRevenue=()=>{
   const [revenuedata,setrevenuedata]=useState([])
   const [startdate,setstartdate]=useState('')
    const [enddate,setenddate]=useState('')

   const RetrieveData=()=>{
axios.post(Local+'revenue').
then((res)=>{
    setrevenuedata(res.data)

}).catch((err)=>{
    console.log(err.toJSON());
})
   }

useEffect(() => {

RetrieveData()

 
}, [])

const Search=(Startdate,Enddate)=>{
    const getdata=revenuedata.filter((data)=>{
        const date=data.BookingDate
        return date >= Startdate && date <= Enddate

    })

    setrevenuedata(getdata)

    

}
   
    return(
        <>
        
        <div>
      
      

            
        </div>
        <div>
            <GetAllRevenue revenue={revenuedata}/>
      
        </div>
        </>
    )
}

export default GetRevenue