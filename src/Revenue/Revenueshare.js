import React from "react";
import { useState, useEffect } from "react";
//import { Company, Driver, VehicleOwner } from "./SharePercentage";
import { db } from "../FireBase/firebaseConfig";
import { addDoc, addDocs, collection, doc } from "firebase/firestore";



const ShareRevenue = () => {
const Style={
  fontSize:"20px",
  border:"0.5px solid black",
}

  const [LetShare, setLetShare] = useState({ Company:"", Driver:"", Owner:""})


  const GetData = async (e) => { 
    const { name, value } = e.target
    setLetShare((data) => {
      return {
        ...data,
        [name]: value,
      }

    })

  }

  
  const SaveData=async(e)=>{
    e.preventDefault()
    try {
      await addDoc(collection(db, "Share"), {
        ...LetShare
      })
      alert("Shared")
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div className="row w-50">
          <h1 className="display-4">Revenue Share Percentage</h1>
          <form onSubmit={SaveData}>
            <div className="col-md-8">
              <div className="form-group">
              <label ></label>
                <input type="text" placeholder="Enter Percentage(%)(Company)" className="form-control" name="Company"  onChange={GetData} style={Style}/>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Enter Percentage(%)(Driver)" className="form-control" name="Driver" onChange={GetData} style={Style} />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Enter Percentage(%)(Owner)" className="form-control" name="Owner" onChange={GetData} style={Style} />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">Save Record</button>
              </div>
            </div>
            <div className="col-md-6"></div>
          </form>
        </div>

      </div>
    </>
  )
}
export default ShareRevenue;