import { createSlice } from "@reduxjs/toolkit";

const initialState={
    showSnack:false,
}

export const snackBarSlice=createSlice(
    {
        name:'snackBarSlice',
        initialState,
        reducers:{
            showSnankBar :(state)=>
            {
                 state.showSnack=true;
            },
            closeSnackBar:(state)=>
            {
                state.showSnack=false;
            }
            
        }
    }

)
export default snackBarSlice.reducer;
export const {showSnankBar,closeSnackBar}=snackBarSlice.actions


