import { combineReducers } from 'redux';
import cellsReducer from './cellReducer';
import bundlesReducer from './bundlesReducer';
import configReducer from './configReducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
  config: configReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
