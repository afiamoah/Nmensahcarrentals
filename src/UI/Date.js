export const date = new Date(); // Replace with your Date object

 export const year = date.getFullYear();
export const month = date.getMonth() + 1; // Adding 1 to get the actual month
export const day = date.getDate();
export let FinalDate;

if(month<10){

 FinalDate=`${year}-${"0"+month}-${day}`
}

if(day<10){

    FinalDate=`${year}-${month}-${'0'+day}`
   }
