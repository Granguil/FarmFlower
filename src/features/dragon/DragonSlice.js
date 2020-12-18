import { createSlice } from '@reduxjs/toolkit';

export const dragonSlice = createSlice({
  name: 'dragon',
  initialState: {
    dragons:[],
  },
  reducers: {
    addDragon:(state,action)=>{
        return {...state,dragons:[...state.dragons,action.payload]}
    },
    removeDragon:(state,action)=>{
        const newState=[...state.dragons];
        newState.splice(action.payload,1);
        return {...state,dragons:[...newState]}
    },
    reverse:(state)=>{
        const newState=[...state.dragons];
        newState.reverse();
        return {...state,dragons:[...newState]}
    }
  },
});

export const { addDragon, removeDragon, reverse} = dragonSlice.actions;

export const selectDragons = state => state.dragon.dragons;

export default dragonSlice.reducer;