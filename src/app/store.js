import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import farmReducer from './../features/farm/farmSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    farm: farmReducer,
  },
});
