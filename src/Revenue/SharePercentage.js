import React from "react"
import { useState, useEffect } from "react"
import { db } from "../FireBase/firebaseConfig";
import { collection, doc, getDoc, getDocs, docs } from "firebase/firestore";
import { SharedRevenue } from "./shareContext";
import { addDoc } from "firebase/firestore";


const RetrieveShare = () => {
    const [Share, setShare] = useState({})


    const GetShare = async () => {
        const AllPercentage = await getDocs(collection(db, "Share"))
        const GetAll = AllPercentage.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        GetAll.map((data) => {
            setShare({ ...data })
        })



    }

    useEffect(() => {
        GetShare()
    }, [])

    return (
        <>
            <h1 className="display-1">share</h1>
            <div className="card-group">
                <div className="card">
                    {/* <img src="..." className="card-img-top" alt="..." /> */}
                    <div className="card-body">
                        <h1 className="card-title display-1">Company:{Share.Company}</h1>
                    </div>
                </div>
                <div className="card">
                    {/* <img src="..." className="card-img-top" alt="..." /> */}
                    <div className="card-body">
                        <h1 className="card-title display-1">Driver</h1>
                    </div>
                </div>
                <div className="card">
                    {/* <img src="..." className="card-img-top" alt="..." /> */}
                    <div className="card-body">
                        <h1 className="card-title display-1">Owner</h1>
                    </div>
                </div>
            </div>
        </>
    )


}

export default RetrieveShare;