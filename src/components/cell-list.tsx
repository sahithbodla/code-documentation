import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTypedSelector, useActions } from '../hooks';
import { getDocument } from '../api';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import './cell-list.css';
import NewDocument from './new-document';
import Document from './document';

const CellList: React.FC = () => {
  const docIdRef = useRef(useParams());
  const [docName, setDocName] = useState<string>();
  const { loadInitData, initialiseCellState, initialiseBundleState } =
    useActions();
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  // This is for new document save modal
  useEffect(() => {
    (
      document.querySelectorAll(
        '.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button'
      ) || []
    ).forEach(($close) => {
      const $target = $close.closest('.modal');

      $close.addEventListener('click', () => {
        $target?.classList.remove('is-active');
      });
    });
    return () => {
      initialiseCellState();
      initialiseBundleState();
    };
  }, [initialiseCellState, initialiseBundleState]);

  //To load initial data
  useEffect(() => {
    const dummy = async () => {
      if (docIdRef.current.id) {
        const response2 = await getDocument(docIdRef.current.id);
        if (response2.success) {
          setDocName(response2.document.name);
          loadInitData(
            response2.document.order,
            response2.document.data,
            docIdRef.current.id,
            response2.document.name
          );
        } else {
          // TODO: Handle failure reponse
        }
      }
    };
    dummy();
  }, [loadInitData]);

  const cellsToRender = (
    <React.Fragment>
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {cells.map((cell) => (
        <React.Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell prevCellId={cell.id} />
        </React.Fragment>
      ))}
    </React.Fragment>
  );

  return (
    <>
      {!docIdRef.current.id ? (
        <NewDocument setDocName={setDocName} docName={docName || ''}>
          {cellsToRender}
        </NewDocument>
      ) : (
        <Document docId={docIdRef.current.id} docName={docName || ''}>
          {cellsToRender}
        </Document>
      )}
    </>
  );
};

export default CellList;
