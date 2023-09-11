import  express from "express";
import { connect } from "./src/dbproperties/db.js";
import cors from 'cors'
import { FindMyBookingCode,AddNewBooking,AllBookings,FindCode,FindAll,SearchAllBooking,ClientName,ClientTelephone,BookingCode,PendingBookings,DailyBooking,DeleteBooking,EditBooking,SearchAllBookingId} from "./src/dbproperties/queries.js";


const port=process.env.PORT || 8000

const rent=express()

rent.use(express.json());
rent.use(cors());


rent.get('/',(req,res)=>{
    res.send("hello")

})

rent.post('/newbooking',(req,res)=>{
    const {Bookid,Fullname,Address,Telephone,Purpose,Amount,Cartype,BookingDate,DeliveryDate,Days,PaymentStatus,ConfirmPayment,Email,Service,DeliveryTime,ReminderDate}=req.body

    connect.query(AddNewBooking,{Bookid:Bookid,Fullname:Fullname,Address:Address,Telephone:Telephone,Purpose:Purpose,Amount:Amount,Cartype:Cartype,BookingDate:BookingDate,DeliveryDate:DeliveryDate,Days:Days,PaymentStatus:PaymentStatus,ConfirmPayment:ConfirmPayment,Email:Email,Service:Service,DeliveryTime:DeliveryTime,ReminderDate:ReminderDate},(err,data)=>{
    if(err){
        throw err
    }else{
        console.log('data send')
        res.send({data:data})
    }
    })
    

})

rent.post('/myid',(req,res)=>{
    const {Bookid,Telephone}=req.body

    connect.query(FindCode,[Bookid,Telephone],(err,data)=>{
    if(err){
        throw err
    }else{
        console.log(data)
        res.json(data)
       
    }
    })

})

rent.post('/mycode',(req,res)=>{

    const {DeliveryDate,Telephone,Amount}=req.body

    connect.query(FindMyBookingCode,[DeliveryDate,Telephone,Amount],(err,data)=>{
    if(err){
        throw err
    }else{
       
        res.json(data)
       
    }
    })

})

    connect.query(FindCode,[Bookid,Telephone],(err,data)=>{
    if(err){
        throw err
    }else{
        console.log(data)
        res.json(data)
       
    }
    })

})

rent.post('/seeid',(req,res)=>{
    const {id}=req.body

    connect.query(FindAll,[id],(err,data)=>{
    if(err){
        throw err
    }else{
        console.log(data)
        res.json(data)
        
       
    }
    })

})


rent.post('/savebookings',(req,res)=>{
    res.send("saved")
    const {Bookid,Fullname,Address,Telephone,Purpose,Amount,Cartype,BookingDate,DeliveryDate,Days,PaymentStatus,ConfirmPayment,Email,Service,DeliveryTime,ReminderDate}=req.body

    connect.query(AddNewBooking,{Bookid:Bookid,Fullname:Fullname,Address:Address,Telephone:Telephone,Purpose:Purpose,Amount:Amount,Cartype:Cartype,BookingDate:BookingDate,DeliveryDate:DeliveryDate,Days:Days,PaymentStatus:PaymentStatus,ConfirmPayment:ConfirmPayment,Email:Email,Service:Service,DeliveryTime:DeliveryTime,ReminderDate:ReminderDate},(err,data)=>{
    if(err){
        throw err
    }else{
        console.log('data send')
    }
    })

})

//search booking
///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
rent.get('/pending',(req,res)=>{
    const {Bookid,Fullname,Address,Telephone,Purpose,Amount,Cartype,BookingDate,DeliveryDate,Days,PaymentStatus,ConfirmPayment,Email,Service,DeliveryTime,ReminderDate}=req.body

    connect.query(PendingBookings,{Bookid:Bookid,Fullname:Fullname,Address:Address,Telephone:Telephone,Purpose:Purpose,Amount:Amount,Cartype:Cartype,BookingDate:BookingDate,DeliveryDate:DeliveryDate,Days:Days,PaymentStatus:PaymentStatus,ConfirmPayment:ConfirmPayment,Email:Email,Service:Service,DeliveryTime:DeliveryTime,ReminderDate:ReminderDate},(err,data)=>{
    if(err){
        throw err
    }else{
        res.json(data)
    }
    })

})
////////////////////////////////////////////////
rent.post('/allbookings',(req,res)=>{
    connect.query(SearchAllBooking,(err,data)=>{
    if(err){
        throw err
    }else{
        res.json(data)
    }
    })

})

////////////////////////////////////////////////
rent.post('/searchid',(req,res)=>{
    const {id}=req.body
    connect.query(SearchAllBookingId,[id],(err,data)=>{
    if(err){
        throw err
    }else{
        res.json(data)
    }
    })

})

///////////////////////////////////////////////
rent.get('/dailybooking',(req,res)=>{
    const {BookingDate}=req.body

    connect.query(DailyBooking,{BookingDate},(err,data)=>{
    if(err){
        throw err
    }else{
        console.log('data send')
    }
    })

})

//////////////////////////////////////////////////
rent.post('/clientname',(req,res)=>{
    const {Fullname}=req.body

    connect.query(ClientName,{Fullname},(err,data)=>{
    if(err){
        throw err
    }else{
    res.json(data)
    }
    })

})

/////////////////////////////////////////////////
rent.get('/clienttelephone',(req,res)=>{
    const {Telephone}=req.body

    connect.query(ClientTelephone,{Telephone},(err,data)=>{
    if(err){
        throw err
    }else{
    res.json(data)
    }
    })
})


///////////////////////////////////////////////
rent.post('/bookingcode',(req,res)=>{
    const {Bookid}=req.body

    connect.query(BookingCode,[Bookid],(err,data)=>{
    if(err){
        throw err
    }else{
    res.json(data)
    }
    })
})

///////////////////////////////////////////////
rent.post('/delete',(req,res)=>{
    const {id}=req.body

    connect.query(DeleteBooking,[id],(err,data)=>{
    if(err){
        throw err
    }else{
    res.json(data)
    }
    })
})

///////////////////////////////////////////////
rent.post('/edit',(req,res)=>{
    const {Fullname,Address,Telephone,Purpose,Amount,Cartype,BookingDate,DeliveryDate,Days,PaymentStatus,ConfirmPayment,Email,Service,DeliveryTime,ReminderDate,id}=req.body

    connect.query(EditBooking,[Fullname,Address,Telephone,Purpose,Amount,Cartype,BookingDate,DeliveryDate,Days,PaymentStatus,ConfirmPayment,Email,Service,DeliveryTime,ReminderDate,id],(err,data)=>{
    if(err){
        throw err
    }else{
        res.json(data)
    }
    })

})


rent.listen(port,()=>{
    console.log("Listening at port "+port)
})
