import { createSlice } from '@reduxjs/toolkit';

export const farmSlice = createSlice({
  name: 'farm',
  initialState: {
    carotte:{
      field: 1,
      number:0,
      time:1,
      compteur:0
    },
    avocat : {
      field:0,
      number:0,
      time:4,
      compteur:0
    },
    money:0,
    tick:false,
    isGrowing:false,
  },
  reducers: {
    increment: (state,{payload}) => {
      
      switch(payload){
      case "carotte":
        console.timeEnd("Avocat");
        return {...state, carotte:{...state.carotte,number:state.carotte.number+state.carotte.field}}
      case "avocat":
        
        return {...state, avocat:{...state.avocat,number:state.avocat.number+state.avocat.field}}
      default:
        return state;
      }
    },
    sell: (state,{payload}) => {
      console.log(payload);
      switch(payload){
      case "carotte":
        return {...state,carotte:{...state.carotte,number:0},money:state.money+state.carotte.number*5}
      case "avocat":
        return {...state,avocat:{...state.avocat,number:0},money:state.money+state.avocat.number*5}
      default:
        return state;
      }
      
    },
    buy: (state,{payload}) => {
      switch(payload){
      case "carotte":
        console.time("Avocat");
        return {...state,money:state.money-20,carotte:{...state.carotte,field:state.carotte.field+1}}
      case "avocat":
        
        return {...state,money:state.money-20,avocat:{...state.avocat,field:state.avocat.field+1}}
      default:
        return state;
      }
      
    },
    doTick:(state)=>{
        return {...state,tick:!state.tick}
    },
    growing:(state)=>{
        return {...state,isGrowing:!state.isGrowing}
    },
    timer:(state,{payload})=>{
      let c;
      switch(payload){
        case "carotte":
          c=state.carotte.compteur+1;
          if(c>state.carotte.time){
            c=0;
          }
          return {...state,carotte:{...state.carotte,compteur:c}}
        case "avocat":
          c=state.avocat.compteur+1;
          if(c>state.avocat.time){
            c=0;
          }
          return {...state,avocat:{...state.avocat,compteur:c}}
        default:
          return state;
      }
    }
  },
});

export const { increment, sell, buy, growing, doTick, timer} = farmSlice.actions;

export const chrono=()=>dispatch=>
    {
        setInterval(()=>{
            dispatch(doTick())
            },1000);
            
        
}


export const selectCarotteField = state => state.farm.carotte.field;
export const selectCarotteNumber = state => state.farm.carotte.number;
export const selectCarotteTime = state => state.farm.carotte.time;
export const selectCarotteCounter = state => state.farm.carotte.compteur;
export const selectAvocatField = state => state.farm.avocat.field;
export const selectAvocatNumber = state => state.farm.avocat.number;
export const selectAvocatTime = state => state.farm.avocat.time;
export const selectAvocatCounter = state => state.farm.avocat.compteur;
export const selectMoney = state => state.farm.money;
export const selectTick = state => state.farm.tick;
export const selectGrowing = state => state.farm.isGrowing;
export default farmSlice.reducer;