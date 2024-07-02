import React from "react";
import { useState,useEffect } from "react";

const MyExpenses=()=>{
const [FormData, setFormData]=useState({
Type:"",
Desc:"",
Purpose:"",
User:"",
Amount:""
})

const AcceptChanges=(event)=>{
    const {name,value}=event.target
setFormData((form)=>{
    return{
        ...form,
        [name]: value
    }
})
} 

console.log(FormData)
    return(
<>
<div className="container d-flex align-item-center justify-content-center mt-5">
    <div className="row">
    <h1>KEEP RECORDS OF DAILY EXPENSES</h1>
<div className="col-md-6 w-100">
    <form>
    <div className="form-group">
    <select className="form-select form-control" name="Type">
  <option>General Expenses</option>
  <option>Tarrifs</option>
  <option>Transportation</option>
  <option>Salary</option>
</select>
    </div>
    <div className="form-group">
<input type="text" placeholder="Description" className="form-control"  name="Desc" onChange={AcceptChanges}/>
    </div>
    <div className="form-group">
<input type="text" placeholder="Purpose" className="form-control"  name="Purpose" onChange={AcceptChanges} />
    </div>
    <div className="form-group">
<input type="text" placeholder="Spent By" className="form-control" name="User" onChange={AcceptChanges} />
    </div>
    <div className="form-group">
<input type="number" placeholder="Amount Taken" className="form-control" name="Amount"onChange={AcceptChanges} />
    </div>

    <div className="form-group">
<input type="submit"  className="btn btn-primary"  />
    </div>
    </form>
</div>

    </div>

</div>
</>


    )
}

export default MyExpenses;