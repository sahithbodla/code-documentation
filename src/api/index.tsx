import axios from 'axios';
import { GetSaveNewDocumentObj, apiErrorCallback, EditCells } from '../utils';

export const saveNewDocument = async (dataObj: GetSaveNewDocumentObj) => {
  return await axios
    .post(
      `${process.env.REACT_APP_SERVER_URI}${process.env.REACT_APP_API_VERSION}document`,
      dataObj
    )
    .then((response) => {
      return response.data;
    })
    .catch(apiErrorCallback);
};

export const getDocument = async (docId: string) => {
  return await axios
    .get(
      `${process.env.REACT_APP_SERVER_URI}${process.env.REACT_APP_API_VERSION}document/${docId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch(apiErrorCallback);
};

export const getOrder = async (docId: string) => {
  return await axios
    .get(
      `${process.env.REACT_APP_SERVER_URI}${process.env.REACT_APP_API_VERSION}document/order/${docId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch(apiErrorCallback);
};

export const deleteCell = async (docId: string, cellId: string) => {
  return await axios
    .delete(
      `${process.env.REACT_APP_SERVER_URI}${process.env.REACT_APP_API_VERSION}document/${docId}/${cellId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch(apiErrorCallback);
};

export const setOrder = async (docId: string, order: string[]) => {
  return await axios
    .patch(
      `${process.env.REACT_APP_SERVER_URI}${process.env.REACT_APP_API_VERSION}document/order/${docId}`,
      {
        order,
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch(apiErrorCallback);
};

export const addCell = async (docId: string, type: string, id: string) => {
  return await axios
    .patch(
      `${process.env.REACT_APP_SERVER_URI}${process.env.REACT_APP_API_VERSION}document/${docId}`,
      {
        type,
        id,
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch(apiErrorCallback);
};

export const editCells = async (docId: string, changedCells: EditCells[]) => {
  return await axios
    .patch(
      `${process.env.REACT_APP_SERVER_URI}${process.env.REACT_APP_API_VERSION}document/cells/${docId}`,
      {
        cells: changedCells,
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch(apiErrorCallback);
};

export const getAllDocumentsByUser = async (userId: string) => {
  return await axios
    .get(
      `${process.env.REACT_APP_SERVER_URI}${process.env.REACT_APP_API_VERSION}documents/${userId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch(apiErrorCallback);
};

export const getTheme = async (googleId: string) => {
  return await axios
    .get(
      `${process.env.REACT_APP_SERVER_URI}${process.env.REACT_APP_API_VERSION}user/${googleId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch(apiErrorCallback);
};

export const setTheme = async (googleId: string, theme: string) => {
  return await axios
    .patch(
      `${process.env.REACT_APP_SERVER_URI}${process.env.REACT_APP_API_VERSION}user/${googleId}`,
      {
        theme,
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch(apiErrorCallback);
};
