import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface User {

  id: string;

  full_name: string;

  email: string;

  role?: string;

}



interface AuthState {

  user: User | null;

  token: string | null;

}



const initialState: AuthState = {

  user: null,

  token: localStorage.getItem("access_token"),

};



const authSlice = createSlice({

  name: "auth",

  initialState,


  reducers: {


    loginSuccess: (

      state,

      action: PayloadAction<{

        user: User;

        token: string;

      }>

    ) => {


      state.user = action.payload.user;

      state.token = action.payload.token;


    },



    setUser: (

      state,

      action: PayloadAction<User>

    ) => {


      state.user = action.payload;


    },



    setToken: (

      state,

      action: PayloadAction<string>

    ) => {


      state.token = action.payload;


    },



    logout: (state) => {


      state.user = null;

      state.token = null;


      localStorage.removeItem("access_token");


    },


  },


});



export const {

  loginSuccess,

  setUser,

  setToken,

  logout,


} = authSlice.actions;



export default authSlice.reducer;