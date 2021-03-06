import { createSlice } from '@reduxjs/toolkit';
import Dragon from './../../model/Dragon';

export const dragonSlice = createSlice({
  name: 'dragon',
  initialState: {
    dragons:[],
  },
  reducers: {
    addDragon:(state,action)=>{
        return {...state,dragons:[...state.dragons,new Dragon(action.payload.name,action.payload.element)]}
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
    },
    rename:(state,action)=>{
        const newState=[...state.dragons];
        newState[action.payload.id]={...newState[action.payload.id],name:action.payload.name};
        return {...state,dragons:[...newState]}
    },
    eat:(state,action)=>{
        const newState=[...state.dragons];
        newState[action.payload.id]={...newState[action.payload.id],niveau:newState[action.payload.id].niveau+1};
        return {...state,dragons:[...newState]}
      }
  },
});

export const { addDragon, removeDragon, reverse, rename, eat} = dragonSlice.actions;

export const selectDragons = state => state.dragon.dragons;
export const selectDragonFeu = state =>{
  let dragonFeu=null;
  if(state.dragon.dragons.length===0){
    dragonFeu=new Dragon("Default","Feu");
  }
  state.dragon.dragons.forEach(dragon=> {
    if(dragon.element==="Feu" && dragonFeu===null){
      dragonFeu=dragon;
    }
    if(dragonFeu===null){
      dragonFeu=new Dragon("Default","Feu");
    }
  });
  return dragonFeu;
}

export default dragonSlice.reducer;