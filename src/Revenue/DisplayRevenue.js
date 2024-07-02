import React from "react";
import { RevContext, waitcontext, AllDataContext, firstdate, seconddate, Categories } from "./RevContext";
import { useContext, useState, useEffect } from "react";
import { Fullname } from "../UI/Business/BusinessDetails";

const DisplayAmount = () => {
  const [Amount, setAmount] = useState()
  const FetchAmount = useContext(RevContext)
  const Wait = useContext(waitcontext)
  const Display = useContext(AllDataContext)
  const Date1 = useContext(firstdate)
  const Date2 = useContext(seconddate)
  const category = useContext(Categories)

  const DisplayData = [];
  DisplayData.push(Display)
  return (

    <div>
      <div className="container d-flex align-item-center justify-content-center mt-100">
        <div className="container d-flex align-item-center justify-content-center mt-100">
        </div>

      </div>

      <div className="card">
        <div className="card-body">
          <div className="container mb-5 mt-3">
            <div className="row d-flex align-items-baseline">
              <div className="col-xl-9">

                {/* <p  style={{color: '#7e8d9f',fontSize: '20px'}}>Booking Code<strong>:{Bookid}</strong></p> */}
              </div>

              <hr />
            </div>

            <div className="container">
              <div className="col-md-12">
                <div className="text-center">
                  {/* <i className="fab fa-mdb fa-4x ms-0" style={{color:'#5d9fc5'}}></i> */}
                  <h1>{Fullname}</h1>
                  <h2 className="pt-0 text-danger">Revenue Report</h2>
                </div>

              </div>


              <div className="row">
                <div className="col-xl-8">
                  <ul className="list-unstyled">
                    <h4 className="">Category: <span className="bg-warning text-dark" style={{ fontWeight: 'bold' }}>{category}</span><span className="bg-warning text-dark" style={{ fontWeight: 'bold' }}> Report</span></h4>
                    <h4 className="">From: <span className="bg-warning text-dark" style={{ fontWeight: 'bold' }}>{Date1}</span></h4>
                    <h4 className="">To: <span className="bg-primary text-white" style={{ fontWeight: 'bold' }}>{Date2}</span></h4>
                  </ul>
                </div>

              </div>

              {/* <div className="row my-2 mx-1 justify-content-center"> */}
              <table className="table table-striped table-borderless">
                <thead style={{ backgroundcolor: '#84B0CA' }} className="text-white">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Client</th>
                    <th scope="col">Booking Date</th>
                    <th scope="col">Delivery Date</th>
                    <th scope="col">Vehicle</th>
                    <th scope="col">Days</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {DisplayData.length === 0 ? (
                    <tr>
                      <td colSpan="7">No data available</td>
                      return </tr>
                  ) : (
                    Display.map(data => (
                      <tr key={data.id}>
                        <td scope="row">{data.id}</td>
                        <td>{data.Fullname}</td>
                        <td>{data.BookingDate}</td>
                        <td>{data.DeliveryDate}</td>
                        <td>{data.Cartype}</td>
                        <td>{data.Days}</td>
                        <td>{data.Amount}</td>
                      </tr>
                    ))
                  )}
                </tbody>

              </table>

              <div className="row">

                <div className="col-xl-3">
                  <ul className="list-unstyled">
                  </ul>
                  <p className="text-black float-start"><span className="text-black me-3 text-bold">Company:</span><span
                    style={{ fontSize: '20px', fontFamily: "bold" }}>GH₵{FetchAmount}</span></p>
                </div>
                <div className="col-xl-3">
                  <ul className="list-unstyled">
                  </ul>
                  <p className="text-black float-start"><span className="text-black me-3 text-bold">Driver:</span><span
                    style={{ fontSize: '20px', fontFamily: "bold" }}>GH₵{FetchAmount}</span></p>
                </div>
                <div className="col-xl-3">
                  <ul className="list-unstyled">
                  </ul>
                  <p className="text-black float-start"><span className="text-black me-3 text-bold">Owner:</span><span
                    style={{ fontSize: '20px', fontFamily: "bold" }}>GH₵{FetchAmount}</span></p>
                </div>
                <div className="col-xl-3">
                  <ul className="list-unstyled">
                  </ul>
                  <p className="text-black float-start"><span className="text-black me-3 text-bold">Total Revenue:</span><span
                    style={{ fontSize: '25px', fontFamily: "bold" }}>GH₵{FetchAmount}</span></p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-xl-10">
                  <p>Developed and designed by Airsales IT Solution-0552795346</p>
                </div>
                <div className="col-xl-2">
                  <button type="button" className="btn btn-primary text-capitalize"
                    style={{ background: '#60bdf3' }} id="myprint">Print Now</button>

                </div>
                <div className="col-xl-8" id="myprint">
                  <p className="ms-3">Always Reprint this invoice after payment confirmation by admin</p>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>



  )
}

export default DisplayAmount