import React from "react";
import DataTable from "react-data-table-component";
import TotalRevenue from "./totalrevenue";

const GetAllRevenue=({revenue})=>{
    const columns=[

        {
            name:"id",
            selector:row=>row.id
        },
        {
            name: "Name",
            selector: row=> row.Fullname
        },
        {
            name: "Amount",
            selector:row=> row.Amount
        },

        {
            name: "Payment Status",
            selector:row=> row.PaymentStatus
        },
    
    
    
    ]

  

    return(
        <div>
                  <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <form onSubmit={Search(startdate,enddate)}>
                    <div className="col-md-6">
                    <input type="text" placeholder="search date" className="form-control border border-1 border-dark" value={startdate} onChange={(e)=>{setstartdate(e.target.value)}} />

                    </div>
                    <div className="col-md-6">
                    <input type="text" placeholder="search date" className="form-control border border-1 border-dark" value={enddate} onChange={(e)=>{setenddate(e.target.value)}} />

                    </div>
                    <div className="col-md-2">
                    <input type="submit" className="btn btn-primary" />

                    </div>
                    </form>
                    </div>
                
                </div>
              
                      
        
            </div>
              <div>
                <div className="d-flex flex-column">
                <div>
                <h1>TOTAL REVENUE GENERATED:Ghc <TotalRevenue /></h1>
                </div>         
         
            <div>
           
            </div>
            </div>
            <div>
                <DataTable
                columns={columns}
                data={revenue}
                pagination
                
                >

                </DataTable>
            </div>
        </div>
        </div>
    )

}

export default GetAllRevenue