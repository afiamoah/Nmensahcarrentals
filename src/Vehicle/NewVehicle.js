import React from "react";
import { useState, useEffect } from "react";
import { db } from "../FireBase/firebaseConfig";
import { addDoc,addDocs,doc,docs,collection } from "firebase/firestore";

const AddNewCar = () => {
    //
    const [VehicleDetails, setVehicleDetails] = useState({ Desc: "", Reg: "", Owner: "", Percentage: "" })

    const GetData = (e) => {       
        const { name, value } = e.target
        setVehicleDetails((data) => {
            return {
                ...data,
                [name]: value
            }
        })
console.log(VehicleDetails)
    }

    const SaveData=async(e)=>{
        e.preventDefault();
        try{
        await addDoc(collection(db,"Vehicle"),{
...VehicleDetails
        })
            alert("Saved Successfully")
        }catch(err){
            alert(err)
        }
    }
    useEffect(()=>{

    },[])


    const Style = {
        fontSize: "15px",
        border: "0.3px solid black",
        fontWeight: "bold"
    }

    const StyleButton = {
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
        fontSize: "15px"
    }
    return (

        <>
            <div className="container min-vh-100  d-flex justify-content-center align-items-center h5" >
                <div className="row w-50">
                    <h1 className="display-6 mb-5" >Add New Vehicle</h1>
                    <form onSubmit={SaveData}>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label for="vname">Enter Vehicle Desc</label>
                                <input type="text" placeholder="Desc Vehicle" id="vname" name="Desc" className="form-control h5" style={Style} onChange={GetData}  required/>

                            </div>
                            <div className="form-group">
                                <label for="vnum">Enter Registration Number</label>
                                <input type="text" placeholder="Vehicle Number" id="vnum" name="Reg" className="form-control h5" style={Style}  onChange={GetData} required/>

                            </div>
                            <div className="form-group">
                                <label for="vowner">Enter Owner Details</label>
                                <input type="text" placeholder="Owner Details" id="vowner" name="Owner" className="form-control h5" style={Style}  onChange={GetData} required/>

                            </div>
                            <div className="form-group">
                                <label for="vowner">Enter Percentage Per Trip(%)</label>
                                <input type="text" placeholder="(%) Per Trip" id="vowner" name="Percentage" className="form-control h5" style={Style}  onChange={GetData} required/>

                            </div>
                            <div className="form-group">
                                <input type="submit" id="vsave" className="btn btn-primary w-100 display-1" style={StyleButton} />

                            </div>



                        </div>
                    </form>
                </div>


            </div>
        </>
    )

}

export default AddNewCar