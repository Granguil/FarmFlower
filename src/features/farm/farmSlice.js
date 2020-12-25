import { createSlice } from '@reduxjs/toolkit';
import {eat as eatDragon} from './../dragon/DragonSlice';

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
      time:3,
      compteur:0
    },
    playedTime:0,
    money:0,
    isGrowing:false,
    isGrowingType:0,
  },
  reducers: {
    increment: (state,{payload}) => {
      
      switch(payload){
      case "carotte":
        
        return {...state, carotte:{...state.carotte,number:state.carotte.number+state.carotte.field}}
      case "avocat":
        
        return {...state, avocat:{...state.avocat,number:state.avocat.number+state.avocat.field}}
      default:
        return state;
      }
    },
    sell: (state,{payload}) => {
      
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
        
        return {...state,money:state.money-20,carotte:{...state.carotte,field:state.carotte.field+1}}
      case "avocat":
        
        return {...state,money:state.money-20,avocat:{...state.avocat,field:state.avocat.field+1}}
      default:
        return state;
      }
      
    },
    growing:(state,{payload})=>{
      if(!state.isGrowing){
        return {...state,isGrowingType:payload,isGrowing:true}
      }else{
        if(payload===state.isGrowingType){
          return {...state,isGrowing:false,isGrowingType:0}
        }else{
          return {...state,isGrowingType:payload}
        }
      }
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
    },
    play:(state)=>{
      return {...state,playedTime:state.playedTime+1}
    },
  },
  extraReducers:{
    [eatDragon]:(state,action)=>{
      return {...state,carotte:{...state.carotte,number:state.carotte.number-action.payload.niveau*2},avocat:{...state.avocat,number:state.avocat.number-action.payload.niveau}}
    }
  }
});

export const { increment, sell, buy, growing, doTick, timer, play, eat} = farmSlice.actions;

export const chrono=()=>dispatch=>
    {
        setInterval(()=>{
            dispatch(play());
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
export const selectPlayedTimeInS = state => state.farm.playedTime;
export const selectIsGrowingType = state => state.farm.isGrowingType;
export const selectPlayedTime = state => {
  let timeInS=Number(state.farm.playedTime);
  let h=Math.floor(timeInS/3600);
  timeInS-=h*3600;
  let m=Math.floor(timeInS/60);
  timeInS-=m*60;
  if(h<10){
    h="0"+h;
  }
  if(m<10){
    m="0"+m;
  }
  if(timeInS<10){
    timeInS="0"+timeInS;
  }
  return h+":"+m+":"+timeInS;
};


export default farmSlice.reducer;