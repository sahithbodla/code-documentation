import { toast, Slide } from 'react-toastify';
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
  docName: string = 'Code Master 1.0'
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

export interface EditCells {
  cellId: string;
  content: string;
  type?: string;
}

export const getChangedCells = (
  oldData: { [cellId: string]: Cell },
  newData: { [cellId: string]: Cell }
): EditCells[] => {
  let arr: EditCells[] = [];
  Object.entries(newData).forEach((cell) => {
    if (newData[cell[0]].content !== oldData[cell[0]]?.content || '') {
      arr.push({ cellId: cell[0], content: newData[cell[0]].content });
    }
  });
  return arr;
};

export const setToast = (message: string) => {
  toast.success(message, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Slide,
  });
};
