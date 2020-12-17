import { createSlice } from '@reduxjs/toolkit';

export const farmSlice = createSlice({
  name: 'farm',
  initialState: {
    field: 1,
    flower:0,
    money:0,
    tick:false,
    isGrowing:false,
  },
  reducers: {
    increment: (state) => {
      
      return {...state, flower:state.flower+state.field}
    },
    sell: (state) => {
      return {...state,flower:0,money:state.money+state.flower*5}
    },
    buy: (state) => {
      return {...state,money:state.money-20,field:state.field+1}
    },
    doTick:(state)=>{
        return {...state,tick:!state.tick}
    },
    growing:(state)=>{
        return {...state,isGrowing:!state.isGrowing}
    }
  },
});

export const { increment, sell, buy, growing, doTick} = farmSlice.actions;

export const chrono=()=>dispatch=>
    {
        setInterval(()=>{
            dispatch(doTick())
            },1000);
            
        
}


export const selectField = state => state.farm.field;
export const selectFlower = state => state.farm.flower;
export const selectMoney = state => state.farm.money;
export const selectTick = state => state.farm.tick;
export const selectGrowing = state => state.farm.isGrowing;
export default farmSlice.reducer;