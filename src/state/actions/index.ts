import { ActionType } from '../action-types';
import { Cell, CellTypes } from '../cell';

export type Direction = 'up' | 'down';

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface InsertCellAfterCellAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
    cellId: string;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface LoadInitDataAction {
  type: ActionType.LOAD_INIT_DATA;
  payload: {
    order: string[];
    data: {
      [cell: string]: Cell;
    };
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}
export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface DeleteBundle {
  type: ActionType.DELETE_BUNDLE;
  payload: string;
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterCellAction
  | UpdateCellAction
  | BundleStartAction
  | DeleteBundle
  | BundleCompleteAction
  | LoadInitDataAction;
