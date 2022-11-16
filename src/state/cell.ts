export type CellTypes = 'code' | 'text';
export type CellDirections = 'up' | 'down';

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}
