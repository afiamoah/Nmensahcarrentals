export const AllBookings="select * from Booking order id desc"
export const  AddNewBooking ="insert into booking set ?"

export const FindCode="select * from booking where Bookid=? and Telephone=? "
export const FindAll="select * from booking where id=?"
export const DeleteBooking="delete from booking where id=?"
export const EditBooking="update booking set Fullname=?,Address=?,Telephone=?,Purpose=?,Amount=?,Cartype=?,BookingDate=?,DeliveryDate=?,Days=?,PaymentStatus=?,ConfirmPayment=?,Email=?,Service=?,DeliveryTime=?,ReminderDate=? where id=?"
export const SearchAllBooking="select * from booking order by BookingDate desc"
export const SearchAllBookingId="select * from booking where id=? "
export const PendingBookings="select * from booking where PaymentStatus='Pending'"
export const DailyBooking="select * from booking where BookingDate=?"
export const ClientName="select * from booking where Fullname=?"
export const ClientTelephone=" select * from booking where Telephone=?"
export const  BookingCode="select * from booking where Bookid=?"