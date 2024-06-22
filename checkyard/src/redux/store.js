import { configureStore } from '@reduxjs/toolkit'
import signupReducer from './signupSclice'
import loginReducer from './loginSlice'
import machineReducer from './machineSlice'
import dragReducer from './dragSlice'

export const store = configureStore({
  reducer: {
    signup : signupReducer,
    login : loginReducer,
    machine : machineReducer,
    drag : dragReducer,
  },
})