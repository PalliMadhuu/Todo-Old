import axios from 'axios';
import { SuccessMessage } from '../ToasterMessages/ToastMsgs';
import { useNavigate } from 'react-router-dom';
const API_ENDPOINT = '  /Users';
// const TOKEN_ENDPOINT = 'http://localhost:9090/api/auth/signin'
const TOKEN_ENDPOINT = 'http://localhost:7676/template/oauth/token'

export  async function postData(data:any){
  let response=await axios.post('http://localhost:3000/Users',data)
  
    if(response)
    {
      SuccessMessage('Registration SuccessFull');
  }
}

 export const getDataByEmail = async (emailId:any) => {
  try {
    console.log('Called');
    const response = await axios.get(`${API_ENDPOINT}?emailId=${emailId}`);
    
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAccessToken = async (body:any)=>{
  try {
    console.log('Called');
    const response = await axios.post(`${TOKEN_ENDPOINT}`,body);
    console.log(response.data.accessToken);
    console.log(response.data.refreshToken);
    return response.data.accessToken;
  } catch (error) {
    console.error(error);
  }
};
export const getAccessToken2 = async ()=>{
  try {
    const response = await axios.post(`${TOKEN_ENDPOINT}`,{},{params:{username:'2222222222',password:'user',grant_type:'password'},headers:{username:'template-client',password:'template-client'}});
     localStorage.setItem('refreshToken',response.data.refresh_token);

    return response.data.access_token;
  } catch (error:any) {
    console.error(error.response.data);
  }
};

export const getNewAccessToken = async ()=>{


  try {
    let grantType='refresh_token';
    let refresh_token=localStorage.getItem('refreshToken')
    console.log(refresh_token);
    const response = await axios.post(`${TOKEN_ENDPOINT}?grant_type=${grantType}&refresh_token=${refresh_token}`);
    return response.data.access_token;
  } catch (error:any) {
    const index=error.response.data.error_description.indexOf(':')
    const errorDescription=error.response.data.error_description.substring(0,index);
   if(errorDescription==='Invalid refresh token (expired)')
   {
    window.location.pathname='/';
   } 
   
  }
};




