import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token : localStorage.getItem('token') || null,
  email : null,
  password : null,
  expiration : localStorage.getItem('expiration') || null,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeHandeler : (state,event) => {
        state[event.payload.target.name] = event.payload.target.value;
        // console.log(JSON.parse(JSON.stringify(state)));
    },
    userLogedIn : (state,action) => {
        localStorage.removeItem('token');
        localStorage.setItem('token',action.payload);
        
        state.token = action.payload;
        localStorage.setItem('expiration',Date.now() + 60*60*2*1000);
        state.email = null;
        state.password = null;
        state.expiration = Date.now() + 60*60*2*1000;
    },
    logoutHandeler : (state) => {
      localStorage.removeItem('token');
      state.token = null;
      localStorage.removeItem('expiration')
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeHandeler,userLogedIn,logoutHandeler } = loginSlice.actions

export default loginSlice.reducer