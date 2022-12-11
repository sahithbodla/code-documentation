import axios from 'axios';
import { GetSaveNewDocumentObj } from '../utils';

export const saveNewDocument = async (dataObj: GetSaveNewDocumentObj) => {
  return await axios
    .post(
      `${process.env.REACT_APP_SERVER_URI}${process.env.REACT_APP_API_VERSION}document`,
      dataObj
    )
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
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
    });
};
