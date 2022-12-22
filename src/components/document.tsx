import React from 'react';
import { editCells } from '../api';
import { useActions, useTypedSelector } from '../hooks';
import { getChangedCells } from '../utils';
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
  const { addServiceData } = useActions();

  const saveChanges = async () => {
    if (docId) {
      const {
        serviceData: { data: sData },
        data,
        order,
      } = docInfo;
      const modifiedCells = getChangedCells(sData, data);
      if (modifiedCells.length > 0) {
        await editCells(docId, modifiedCells);
        addServiceData({ order, data });
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
