import { Cell } from '../state';

export interface GetSaveNewDocumentObj {
  docName: string;
  docData: {
    order: string[];
    data: {
      [cell: string]: Cell;
    };
  };
}

export const getNewDocumentObj = (
  order: string[],
  data: {
    [cell: string]: Cell;
  },
  docName: string = 'Aladdin Structures 7.0'
): GetSaveNewDocumentObj => {
  return { docName, docData: { order, data } };
};
