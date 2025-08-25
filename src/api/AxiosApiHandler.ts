import axios, { isAxiosError } from "axios";
const baseURL  = import.meta.env.VITE_BACKEND_URL ;  
export async function  AxiosApiHandler( {  url , method , body  } : {  url :string , method : string , body? : object   })  { 
 try { 
    console.log("base" + baseURL) ; 
    const response = await  axios( {  baseURL  , url , method  , data : body }) ;   
    return  { success : true  ,  status : response.status , data  : response.data  } ;  
 } 
 catch(e) { 
    if(isAxiosError(e)) { 
        if(e.response) { 
            return  { success: false , data : e.response.data  ,  status: e.response.status  }  ;  
        }
        else { 
            return { success : false , data : "server did not respond." }  
        }
    }
    else { 
        console.log(e) ; 
        return  { success :false ,  data : "An error occured." }
    }
 }
}