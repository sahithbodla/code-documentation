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
  cellType: CellTypes
): InsertCellAfterCellAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const loadInitData = (
  order: string[],
  data: { [cell: string]: Cell }
) => {
  return {
    type: ActionType.LOAD_INIT_DATA,
    payload: {
      order,
      data,
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
