import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    dragging : false,
}

export const dragSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    handleDragEnter : (state,e) => {
        e.payload.preventDefault();
        e.payload.stopPropagation();
        state.dragging = true;
    },

    handleDragLeave : (state,e) => {
        e.payload.preventDefault();
        e.payload.stopPropagation();
        state.dragging = false;
    },

    handleDragOver : (state,e) => {
        e.payload.preventDefault();
        e.payload.stopPropagation();
    },
    setDragging : (state,event) => {
        state.dragging = event.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { handleDragEnter,handleDragLeave,handleDragOver,setDragging } = dragSlice.actions

export default dragSlice.reducer