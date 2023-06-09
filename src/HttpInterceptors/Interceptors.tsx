import axios from "axios";
import { getNewAccessToken } from "../UsersAxios/CrudOnUsers";
import { getAllDetails } from "./ApiCalls";


const sendRequestWithNewToken = (config:any) => {
    // Get the new access token from Session Storage
    const newAccessToken = sessionStorage.getItem('accessToken');
    console.log("new Access Token"+newAccessToken);
    
    // Add the new access token to the request headers
const updatedConfig = {

        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${newAccessToken}`,

        },
    };

    // Send the updated request with the new access token
    return axios(updatedConfig);
};
export const axiosInterceptors=axios.create({
    // baseURL:'http://localhost:9090/api/auth',
    baseURL:'http://localhost:7676/template',
});
axiosInterceptors.interceptors.request.use(
    (config)=>{
        const token=sessionStorage.getItem('accessToken');
        const refreshToken=sessionStorage.getItem('refreshToken');
        if(token)
        {
            config.headers["Authorization"]=`Bearer ${token}`;
        }
        console.log(config)
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

axiosInterceptors.interceptors.response.use(
    (response)=>
  {
    if(response.status===200)
    {
        window.alert('request success');
    }
    return response
  },
  async (error)=>
  {
    const originalRequest = error.config;
    const index=error.response.data.error_description.indexOf(':')
    const errorDescription=error.response.data.error_description.substring(0,index);
    if(error.response.status===401 && errorDescription==='Access token expired' && !originalRequest._retry)
    {

        originalRequest._retry = true;
        console.log('access token Expired');
           sessionStorage.removeItem('accessToken');
           let new_access_token= await getNewAccessToken();
           sessionStorage.setItem('accessToken',new_access_token);
        //    let userData= await  getAllDetails();
        //    console.log(userData.data);
        return sendRequestWithNewToken(originalRequest);


    }
      return Promise.reject(error);
  }


  
);


