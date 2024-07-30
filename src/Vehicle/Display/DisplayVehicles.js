import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../FireBase/firebaseConfig";
import { getDocs, setDocs, collection, doc, docs,deleteDoc} from "firebase/firestore";
import DeleteData from "./DeleteEdit";
import { useNavigate } from "react-router-dom";

const DisplayVehicles = () => {
    const [Vehicles, setVehicles] = useState([])
    const Navigate=useNavigate()


    useEffect(() => {
        const ViewAll = async () => {
            const MyVehicles = await getDocs(collection(db, "Vehicle"));
            const ShowAllVehicles = MyVehicles.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setVehicles(ShowAllVehicles)

            return Vehicles
        }
        ViewAll()


    }, [])


    const ShowDetails=(id)=>{
    Navigate("/EditVehicle/"+id)
    }

    return (

        <>
            <div>
                <h1 className="display-1">Display All Vehicles</h1>
            </div>

            <div>

                <table class="table">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th className="display-10" scope="col">Desc</th>
                            <th className="display-10" scope="col">Registration No</th>
                            <th className="display-10" scope="col">Onwer Details</th>
                            <th  className="display-10" scope="col">Percentage</th>
                            <th>
                              Action 
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Vehicles.map((v) => (
                            <tr>
                                <td className="display-3" key={v.id}>{v.id}</td>
                                <td className="display-7">{v.Desc}</td>
                                <td className="display-7">{v.Reg}</td>
                                <td className="display-7">{v.Owner}</td>
                                <td className="display-7">{v.Percentage}</td>
                                <td className="display-7"> <button onClick={()=>{ShowDetails(v.id)}} className="btn btn-primary mr-5">View</button>
                                <button  onClick={() => DeleteData(v.id)}  className="btn btn-danger">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </>
    )
}

export default DisplayVehicles;