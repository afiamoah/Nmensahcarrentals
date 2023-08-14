export const date = new Date(); // Replace with your Date object

 export const year = date.getFullYear();
export const month = date.getMonth() + 1; // Adding 1 to get the actual month
export const day = date.getDate();
export let FinalDate;
export let Reminder;
export let Y,M,D,noticeDate;






if(month<10){

 FinalDate=`${year}-${"0"+month}-${day}`
 Reminder = new Date(FinalDate);
 Reminder.setDate(Reminder.getDate() - 2);
  Y=Reminder.getFullYear()
  M=Reminder.getMonth() 
  D=Reminder.getDate();
  noticeDate=`${Y}-${"0"+M}-${D}`
  


}

if(day<10){

    FinalDate=`${year}-${month}-${'0'+day}`
    Reminder = new Date('2023-08-14');
   Reminder.setDate(Reminder.getDate() - 2);
   Y=Reminder.getFullYear()
   M=Reminder.getMonth() 
   D=Reminder.getDate();
   noticeDate=`${Y}-${"0"+M}-${D}`
    
   }
///////////////////////////////////////////


   const NotificationDate=(MyDate)=>{

    if(month<10){
        Reminder = new Date(MyDate);
        Reminder.setDate(Reminder.getDate() - 2);
        Y=Reminder.getFullYear()
         M=Reminder.getMonth() 
         D=Reminder.getDate();
         noticeDate=`${Y}-${"0"+M}-${D}`
         return noticeDate
       
       
       }
       
       if(day<10){
       
           Reminder = new Date(MyDate);
          Reminder.setDate(Reminder.getDate() - 2);
          Y=Reminder.getFullYear()
          M=Reminder.getMonth() 
          D=Reminder.getDate();
          noticeDate=`${Y}-${"0"+M}-${D}`
          return noticeDate
           
          }
   }

   export default NotificationDate;
