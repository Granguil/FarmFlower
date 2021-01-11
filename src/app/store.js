import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import farmReducer from './../features/farm/farmSlice';
import dragonReducer from './../features/dragon/DragonSlice';
import TDReducer from './../features/TD/TDSlice';
import matchReducer from './../features/Match3/MatchSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    farm: farmReducer,
    dragon: dragonReducer,
    TD:TDReducer,
    match:matchReducer,
  },
});
