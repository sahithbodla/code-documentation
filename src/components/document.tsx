import React, { useEffect } from 'react';
import { editCells } from '../api';
import {
  TOAST_DOCUMENT_CHANGED,
  TOAST_DOCUMENT_CHANGED_FAIL,
} from '../constants';
import { useActions, useTypedSelector } from '../hooks';
import { getChangedCells, setToast } from '../utils';
import SaveButton from './save-button';

interface IDocumentProps {
  children: React.ReactNode;
  docId: string;
  docName: string | undefined;
}

const Document: React.FC<IDocumentProps> = ({ children, docId, docName }) => {
  const docInfo = useTypedSelector((state) => {
    return {
      order: state.cells.order,
      data: state.cells.data,
      serviceData: state.cells.serviceData,
    };
  });
  const { addServiceData, setIsChanged } = useActions();
  const a = JSON.stringify(docInfo.serviceData);
  const b = JSON.stringify(docInfo.data);

  useEffect(() => {
    const {
      serviceData: { data: sData },
      data,
    } = docInfo;
    const modifiedCells = getChangedCells(sData, data);
    setIsChanged(modifiedCells.length > 0);
  }, [a, b, docInfo, setIsChanged]);

  const saveChanges = async () => {
    if (docId) {
      const {
        serviceData: { data: sData },
        data,
        order,
      } = docInfo;
      const modifiedCells = getChangedCells(sData, data);
      if (modifiedCells.length > 0) {
        const mResponse = await editCells(docId, modifiedCells);
        if (mResponse.success) {
          setToast(TOAST_DOCUMENT_CHANGED);
          addServiceData({ order, data });
        } else {
          setToast(TOAST_DOCUMENT_CHANGED_FAIL);
        }
      }
    }
  };

  return (
    <div className="cell-list">
      <div className="document-name-container">
        <div>
          <h1 className="title display-inline-block">{docName}</h1>
          <SaveButton docId={docId} saveChanges={saveChanges} />
        </div>
        <h6 className="title is-4">{docId}</h6>
      </div>
      {children}
    </div>
  );
};

export default Document;
