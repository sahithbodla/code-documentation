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

export const apiErrorCallback = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return { success: false, message: error.response.data.message };
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return { success: false, message: error.request };
  } else {
    // Something happened in setting up the request that triggered an Error
    return { success: false, message: error.message };
  }
};

export const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};
