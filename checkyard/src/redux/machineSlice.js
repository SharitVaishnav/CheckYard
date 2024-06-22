import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  name : null,
  token : localStorage.getItem('token') || null,
  TotalUsedCycle : null,
  statusData : null,
  lifeData : null,
}

export const machineSlice = createSlice({
  name: 'machine',
  initialState,
  reducers: {
    parseCsvData : (state,action) => {
        const lines = action.payload.split("\n");
        const headers = lines[0].split(",");
        const data = [];
        const finalData = [];
        for (let i = 1; i < lines.length; i++) {
            const fields = lines[i].split(",");
            finalData.push(fields);
            const entry = {};
            for (let j = 0; j < headers.length; j++) {
                entry[headers[j]] = Number(fields[j]);
            }
            data.push(entry);
        }
        if(lines.length < 5){
          state.statusData = data[0];
          state.TotalUsedCycle = data[0].cycles;
        }
        else{
          state.lifeData = finalData;
          } 
         console.log(JSON.parse(JSON.stringify(state)));
    },
    changeHandeler : (state,action) => {
        state.name = action.payload.target.value;
    },
    userLogin : (state,action) => {
      state.token = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { parseCsvData,changeHandeler,userLogin } = machineSlice.actions

export default machineSlice.reducer