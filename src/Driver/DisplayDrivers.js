import React from "react";
import { useState, useEffect } from "react";
import { storage } from "../FireBase/firebaseConfig";
import { db } from "../FireBase/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL, sets, listAll } from "firebase/storage";
import { getDoc,getDocs,collection,doc,docs,setDoc } from "firebase/firestore";

const GetAllDrivers = () => {
    const imagename = "DVLA-552795446"

    const [Images, setImages] = useState([])
    const [loading, setLoading] = useState(true);
    const [ShowDrivers,setShowDrivers]=useState([])
    let info = []

    const GetDrivers=async()=>{
        const MyDrivers=await getDocs(collection(db, "Driver"));
        const ShowAll=MyDrivers.docs.map(doc=>({id:doc.id, ...doc.data()}))
       
        setShowDrivers(ShowAll)

        return ShowDrivers
    }
    const ShowImage = () => {
        const ImageRef = ref(storage, `DriverImage/${imagename}`)
        getDownloadURL(ImageRef).then(url => {
            setImages(url)
            // alert(url)
        })

        return Image
    }

    const AllDrivers = async () => {
        const ImageRef = ref(storage, "DriverImage/")
        const AllImages = await listAll(ImageRef)
        const urls = await Promise.all(
            AllImages.items.map(async (itemRef) => {
                console.log(itemRef.name)
                const url = await getDownloadURL(itemRef);
                info.push(itemRef)
                return url;
            })
        );
        setImages(urls);
        
    }

    useEffect(() => {
        GetDrivers()
       // AllDrivers()
        // ShowImage()

    }, [imagename])


    return (
        <>
            <div>
                <h1 className="display-1">Display All Drivers</h1>
            </div>
            <div>
                <h1>Image from Firebase Storage</h1>
                {Image && <img src={Image} alt="Firebase Image" height={20} />}
            </div>
            <div>

                <table class="table">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th className="display-10" scope="col">Desc</th>
                            <th className="display-10" scope="col">Registration No</th>
                            <th className="display-10" scope="col">Onwer Details</th>
                            <th className="display-10" scope="col">Percentage</th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ShowDrivers.map((v) => (
                            <tr>

                                <td className="display-9" key={v.id}>{v.FullName}</td>
                                <td className="display-7">{v.Address} </td>
                                    {/* <img key={index} src={v} alt={`Image ${index}`} style={{ width: '200px', margin: '10px' }} /> */}
                                   
                                 <td className="display-7">{v.Telephone}</td>
                                <td className="display-7">{v.DLincense}</td>                                <td className="display-7"> <button onClick={() => { ShowDetails(v.id) }} className="btn btn-primary mr-5">View</button>
                                    <button onClick={() => DeleteData(v.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </>
    )
}

export default GetAllDrivers