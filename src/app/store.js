import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import farmReducer from './../features/farm/farmSlice';
import dragonReducer from './../features/dragon/DragonSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    farm: farmReducer,
    dragon: dragonReducer,
  },
});
