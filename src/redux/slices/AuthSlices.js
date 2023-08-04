import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged : false ,
    email :'',
    password :'',
    userId : ''
}

const AuthSlices = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        set_active_user : (state , action) =>{
            state.isLogged =true;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.userId = action.payload.userId;
        },
        remove_active_user : (state) =>{
            state.isLogged = false;
            state.email = null;
            state.password = null;
            state.userId = null;
        }
    }
})

export const {set_active_user , remove_active_user} = AuthSlices.actions;

export const selectedIslogged = (state)=> state.auth.isLogged;
export const selectedEmail = (state)=> state.auth.email;
export const selectedPassword = (state)=> state.auth.password;
export const selectedUserId = (state)=> state.auth.userId;

export default AuthSlices.reducer;