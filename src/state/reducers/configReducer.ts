import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface ConfigState {
  theme: string;
}

const initialState: ConfigState = {
  theme: '',
};

const reducer = produce(
  (state: ConfigState = initialState, action: Action): ConfigState => {
    switch (action.type) {
      case ActionType.SET_THEME:
        state.theme = action.payload;
        return state;
      default:
        return state;
    }
  },
  initialState
);

export default reducer;
