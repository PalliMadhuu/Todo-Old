import { createSlice } from "@reduxjs/toolkit";

const initialState=
{
    showInfo:false,
    showDelete:false,
    idToDelete:0,
    showCheckedDelete:false,
    showEdit:false,
    showProfile:false,
}
export const popUpSlice=createSlice({
    name:'popUpSlice',
    initialState,
    reducers:
    {
        showInfoModal:(state)=>
        {
            state.showInfo=true;
        },
        hideInfoModal:(state)=>
        {
            state.showInfo=false;
        },
        showEditModal:(state)=>
        {
            state.showEdit=true;
        },
        hideEditModal:(state)=>
        {
            state.showEdit=false;
        },
        showDeleteModal:(state,action)=>
        {
             state.showDelete=true;
             state.idToDelete=action.payload;
        },
        hideDeleteModal:(state)=>
        {
            state.showDelete=false;
        },
        showSelectedDelete:(state)=>
        {
                 state.showCheckedDelete=true;
        },
        hideSelectedDelete:(state)=>
        {
                 state.showCheckedDelete=false;
        },
        showProfile :(state)=>
        {
           state.showProfile=true;
        },
        hideProfile:(state)=>
        {
            state.showProfile=false;
        }

    }
}

)
export default popUpSlice.reducer;

export const {showInfoModal,hideInfoModal,showEditModal,hideEditModal,showDeleteModal,hideDeleteModal,showSelectedDelete,hideSelectedDelete,showProfile,hideProfile}=popUpSlice.actions;
