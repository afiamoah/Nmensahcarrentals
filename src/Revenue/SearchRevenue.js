import React from "react";
import { useState, useEffect } from "react";
import DisplayAmount from "./DisplayRevenue";
import { RevContext, waitcontext, AllDataContext, firstdate, seconddate, Categories } from "./RevContext";
import DashBoard from "../UI/Dashboard";
import { db } from "../FireBase/firebaseConfig";
import { getDoc, getDocs, docs, collection } from "firebase/firestore";
import { Alert } from "bootstrap";


const SearchRevenue = () => {
    const [Date1, setDate1] = useState('2024-05-21');
    const [Date2, setDate2] = useState('2024-05-21');
    const [Amount, setAmount] = useState(0.0)
    const [ListRevenue, setListRevenue] = useState([])
    const [ListAmount, setListAmount] = useState([])
    const [waitfordata, setwaitfordata] = useState(true)
    const [DisplayData, setDisplayData] = useState([])
    const [Category, setCategory] = useState()
    const [Share, setShare] = useState({})
    const [Sh, setSh] = useState(0)
    let SumTotal = parseFloat(0.0)



    const GetAllRevenueDocs = async () => {
        const AllRevenue = await getDocs(collection(db, "Bookings"));
        const ViewRevenue = AllRevenue.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setListRevenue(ViewRevenue)
    }
    const see = (e) => {
        e.preventDefault()
        alert("hello")
    }

    const GetRevenue = (e) => {
        setAmount(0.0)
        e.preventDefault();
        setwaitfordata(false)
        if (Date1.trim() === '' || Date2.trim() === '') {
            alert('Enter Date');
        } else {
            const AllItems = ListRevenue.filter((data) => {
                const SortedDate = data.BookingDate;
                const PaymentStatus = data.PaymentStatus
                const ConfirmPayment = data.ConfirmPayment
                if (Category != "General") {
                    if (SortedDate >= Date1 && SortedDate <= Date2 && PaymentStatus === Category && ConfirmPayment) {
                        SumTotal += parseFloat(data.Amount)
                        setAmount(SumTotal)

                        return data
                    }
                } else {
                    if (SortedDate >= Date1 && SortedDate <= Date2 && PaymentStatus != "Pending" && ConfirmPayment) {
                        SumTotal += parseFloat(data.Amount)
                        setAmount(SumTotal)
                        return data
                    }
                }

            })
            setDisplayData(AllItems)
            return DisplayData, Amount;
        }
    }

    const GetShare = async () => {
        const AllPercentage = await getDocs(collection(db, "Share"))
        const GetAll = AllPercentage.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        GetAll.map((data) => {

            const CompanyShare = parseFloat(data.Company / 100 * (Amount))
            const CompanyResults = parseFloat(CompanyShare)

            const DriverShare = parseFloat(data.Driver / 100 * (Amount))
            const DriverResults = parseFloat(DriverShare)

            const OwnerShare = parseFloat(data.Owner / 100 * (Amount))
            const OwnerResults = parseFloat(OwnerShare)

            setShare({
                CompanyResults,
                DriverResults,
                OwnerResults
            })
    
        })
    }

    useEffect(() => {
        GetAllRevenueDocs();
        GetShare();


    }, [])


    return (
        <>
            <div style={{ marginTop: "30px", marginBottom: "20px" }} className="container d-flex align-item-center justify-content-center mt-150">
                <h1>SEARCH FOR REVENUE:{Sh}</h1>
            </div>
            <div className="container mt-5">
                <form onSubmit={GetRevenue}>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label for="selectOption">Select Category:</label>
                            <select className="form-control" id="selectOption" onChange={e => setCategory(e.target.value)}>
                                <option value="General">General</option>
                                <option value="Full Payment">Full Payment</option>
                                <option value="Commitment Fee">Commitment Fee</option>
                                <option value="Part Payment">Part Payment</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputField1">Input Field 1:</label>
                            <input type="text" className="form-control" id="inputField1" placeholder="search Date" value={Date1} name="Date2" onChange={(e) => { setDate1(e.target.value) }} />
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputField2">Input Field 2:</label>
                            <input type="text" className="form-control" id="inputField2" placeholder="search Date" value={Date2} name="Date2" onChange={(e) => { setDate2(e.target.value) }} />
                        </div>
                        <div className="form-group col-md-3 mt-1">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>


                </form>
            </div>
            <div className="container d-flex align-item-center justify-content-center mt-20">
                <AllDataContext.Provider value={DisplayData}>
                    <RevContext.Provider value={Amount}>
                        <seconddate.Provider value={Date1}>
                            <firstdate.Provider value={Date1}>
                                <Categories.Provider value={Category}>
                                    <DisplayAmount />
                                </Categories.Provider>
                            </firstdate.Provider>
                        </seconddate.Provider>
                    </RevContext.Provider>
                </AllDataContext.Provider>

            </div>
        </>
    )
}
export default SearchRevenue;