import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username : null,
  email : null,
  password : null
}

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    changeHandeler : (state,event) => {
        state[event.payload.target.name] = event.payload.target.value;
        // console.log(JSON.parse(JSON.stringify(state)));
    },
  }
})

// Action creators are generated for each case reducer function
export const { changeHandeler } = signupSlice.actions

export default signupSlice.reducer