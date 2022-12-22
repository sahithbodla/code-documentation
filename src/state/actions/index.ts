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
    docName: string;
    docId: string;
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
export interface InitialiseCellState {
  type: ActionType.INITIAL_CELL_STATE;
}
export interface InitialiseBundleState {
  type: ActionType.INITIAL_BUNDLE_STATE;
}
export interface SetTheme {
  type: ActionType.SET_THEME;
  payload: string;
}
export interface SetIsChanged {
  type: ActionType.IS_CHANGED;
  payload: boolean;
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterCellAction
  | UpdateCellAction
  | BundleStartAction
  | DeleteBundle
  | BundleCompleteAction
  | LoadInitDataAction
  | InitialiseCellState
  | InitialiseBundleState
  | SetTheme
  | SetIsChanged;
