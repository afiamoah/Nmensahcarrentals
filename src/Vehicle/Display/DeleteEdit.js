import { db } from "../../FireBase/firebaseConfig";
import { deleteDoc,collection,doc,docs } from "firebase/firestore";
import { useNavigate,useParams } from "react-router-dom";

const DeleteData=(id)=>{
    try{
        deleteDoc(doc(db, "Vehicle", id));
        alert("Deleted")
    }catch(error){
    alert(error)
    }
    

}

const EditData=(id)=>{


}

export default  DeleteData;