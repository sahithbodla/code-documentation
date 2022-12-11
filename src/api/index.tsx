import axios from 'axios';
import { GetSaveNewDocumentObj, apiErrorCallback } from '../utils';

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
