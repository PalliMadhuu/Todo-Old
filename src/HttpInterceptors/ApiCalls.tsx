import axios from "axios";
import {axiosInterceptors} from './Interceptors';


export  async  function getAllDetails()
{
      try{
        let response=  await axiosInterceptors.get('/getuser/2222222222')
        console.log(response);
        return response;
      } 
      catch(error:any){
       
        return error;
      }   
}

