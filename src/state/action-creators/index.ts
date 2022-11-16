import { ActionType } from '../action-types';
import {
  Action,
  DeleteCellAction,
  InsertCellBeforeCellAction,
  MoveCellAction,
  UpdateCellAction,
} from '../actions';
import { CellDirections, CellTypes } from '../cell';

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

export const moveCell = (
  id: string,
  direction: CellDirections
): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellBefore = (
  id: string,
  cellType: CellTypes
): InsertCellBeforeCellAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType,
    },
  };
};
