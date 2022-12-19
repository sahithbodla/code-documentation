import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: { [key: string]: Cell };
  docId: string;
  docName: string;
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
  docId: '',
  docName: '',
};

const reducer = produce(
  (state: CellsState = initialState, action: Action): CellsState => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;

      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);
        return state;

      case ActionType.MOVE_CELL:
        const { id: cellId, direction } = action.payload;
        const index = state.order.findIndex((id) => {
          return id === cellId;
        });
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = cellId;
        return state;

      case ActionType.INSERT_CELL_AFTER:
        const cell: Cell = {
          content: '',
          type: action.payload.type,
          id: action.payload.cellId,
        };
        state.data[cell.id] = cell;
        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );
        if (foundIndex === -1) {
          state.order.unshift(cell.id);
        } else state.order.splice(foundIndex + 1, 0, cell.id);
        return state;

      case ActionType.LOAD_INIT_DATA:
        const { order, data, docName, docId } = action.payload;
        state.order = order;
        state.data = data;
        state.docId = docId;
        state.docName = docName;
        return state;

      case ActionType.INITIAL_CELL_STATE:
        return initialState;

      default:
        return state;
    }
  },
  initialState
);

export default reducer;
