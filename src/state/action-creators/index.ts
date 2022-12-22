import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import {
  DeleteCellAction,
  Direction,
  InsertCellAfterCellAction,
  MoveCellAction,
  UpdateCellAction,
  Action,
  DeleteBundle,
  InitialiseCellState,
  InitialiseBundleState,
  SetTheme,
  SetIsChanged,
} from '../actions';
import { Cell, CellTypes } from '../cell';
import bundle from '../../bundler';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (payload: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes,
  cellId: string
): InsertCellAfterCellAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
      cellId,
    },
  };
};

export const loadInitData = (
  order: string[],
  data: { [cell: string]: Cell },
  docId: string,
  docName: string
) => {
  return {
    type: ActionType.LOAD_INIT_DATA,
    payload: {
      order,
      data,
      docId,
      docName,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });
    const result = await bundle(input);
    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: {
          loading: false,
          code: result.code,
          err: result.err,
        },
      },
    });
  };
};

export const deleteBundle = (payload: string): DeleteBundle => {
  return {
    type: ActionType.DELETE_BUNDLE,
    payload,
  };
};

export const initialiseCellState = (): InitialiseCellState => {
  return { type: ActionType.INITIAL_CELL_STATE };
};

export const initialiseBundleState = (): InitialiseBundleState => {
  return { type: ActionType.INITIAL_BUNDLE_STATE };
};

export const setTheme = (payload: string): SetTheme => {
  return { type: ActionType.SET_THEME, payload };
};

export const setIsChanged = (payload: boolean): SetIsChanged => {
  return { type: ActionType.IS_CHANGED, payload };
};
