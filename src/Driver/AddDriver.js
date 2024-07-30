import React from "react";
import { useState, useEffect } from "react";
import { db } from "../FireBase/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL,sets } from "firebase/storage";
import { storage } from "../FireBase/firebaseConfig";
import { addDoc, doc, collection } from "firebase/firestore";


const NewDriver = () => {
    const [formData, setformData] = useState({ FullName: "", Address: "", Telephone: "", GHACard: "", DLincense: "345678", DLType: "" })
    const [LincenseImage, setLincenseImage] = useState()


    const GetData = (e) => {
        const { name, value } = e.target;
        setformData((data) => {
            return {
                ...data,
                [name]: value
            }
        })
    }

    const ImageUpload = () => {
        const ImageRef = ref(storage, `DriverImage/${formData.DLincense}`)
        uploadBytes(ImageRef, LincenseImage).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url)
                alert("Uploaded")
            })
        })
    }

    const SaveData = async (e) => {
        e.preventDefault();
        try {
             await addDoc(collection(db, "Driver"), {
                ...formData
            })
            alert("Data Saved")
            ImageUpload();
        } catch (error) {
            alert(error)
        }


    }

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
                    <h1 className="display-6 mb-5" >Add New Driver</h1>
                    <form onSubmit={SaveData}>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label for="vname">Enter Full Name</label>
                                <input type="text" placeholder="Name" id="vname" name="FullName" className="form-control h5" style={Style} onChange={GetData} required />

                            </div>
                            <div className="form-group">
                                <label for="vnum">Enter Address</label>
                                <input type="text" placeholder="Address" id="vnum" name="Address" className="form-control h5" style={Style} onChange={GetData} required />

                            </div>
                            <div className="form-group">
                                <label for="vowner">Telephone</label>
                                <input type="number" placeholder="+233" id="vowner" name="Telephone" className="form-control h5" style={Style} onChange={GetData} required />

                            </div>
                            <div className="form-group">
                                <label for="vowner">Enter ID Card No.</label>
                                <input type="text" placeholder="ID Card No" id="vowner" name="GHACard" className="form-control h5" style={Style} onChange={GetData} required />

                            </div>
                            <div className="form-group">
                                <label for="vowner">Enter Driver's Lincense Details.</label>
                                <input type="text" placeholder="Lincense ID" id="vowner" name="DLincense" className="form-control h5" style={Style} onChange={GetData} required />

                            </div>
                            <div className="form-group">
                                <label for="vowner">Enter Driver's Lincense Type.</label>
                                <input type="text" placeholder="Lincense Type" id="vowner" name="DLType" className="form-control h5" style={Style} onChange={GetData} required />

                            </div>
                            <div className="form-group">
                                <label for="vowner">Upload Lincense Image.</label>
                                <input type="file" placeholder="Upload Lincense Image Here" id="vowner" name="LincenseImage" className="form-control h5" style={Style} onChange={(e) => { setLincenseImage(e.target.files[0]) }} required />

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

export default NewDriver