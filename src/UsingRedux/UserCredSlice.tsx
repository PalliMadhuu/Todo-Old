import { createSlice } from '@reduxjs/toolkit';
const userSlice=createSlice(
    {
        name:'userDetails',
      initialState:{
        details:{
            emailId:"",
            userName:"",
            mobileNumber:""

        }
      },
        reducers:
        {
               userCred:(state,action)=>
               {
                state.details=action.payload;
               }
        }

    }
)
export default userSlice.reducer;
export const {userCred}=userSlice.actions;
