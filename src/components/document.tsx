import React from 'react';
import { editCells, getDocument } from '../api';
import { useTypedSelector } from '../hooks';
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
    };
  });

  const saveChanges = async () => {
    if (docId) {
      const oldDocument = await getDocument(docId);
      const newData = docInfo.data;
      const changedCells = getChangedCells(oldDocument.document.data, newData);
      if (changedCells.length > 0) {
        await editCells(docId, changedCells);
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
