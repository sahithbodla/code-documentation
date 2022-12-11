import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTypedSelector, useActions } from '../hooks';
import { getDocument, saveNewDocument, editCells } from '../api';
import { getNewDocumentObj, getChangedCells } from '../utils';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import './cell-list.css';

const CellList: React.FC = () => {
  const docIdRef = useRef(useParams());
  const navigate = useNavigate();
  const { loadInitData } = useActions();
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );
  const docInfo = useTypedSelector((state) => {
    return {
      order: state.cells.order,
      data: state.cells.data,
    };
  });

  useEffect(() => {
    const dummy = async () => {
      if (docIdRef.current.id) {
        const response2 = await getDocument(docIdRef.current.id);
        if (response2.success) {
          loadInitData(response2.document.order, response2.document.data);
        } else {
          // TODO: Handle failure reponse
        }
      }
    };
    dummy();
  }, [loadInitData]);

  const handleSaveDocClick = async () => {
    console.log(docIdRef.current.id);
    if (!docIdRef.current.id) {
      const dataObj = getNewDocumentObj(docInfo.order, docInfo.data);
      const response = await saveNewDocument(dataObj);
      if (response.success) {
        navigate(`/${response.documentId}`);
        window.location.reload();
      } else {
        // TODO: Handle failure reponse
      }
    } else {
      const oldDocument = await getDocument(docIdRef.current.id);
      const newData = docInfo.data;
      const changedCells = getChangedCells(oldDocument.document.data, newData);
      if (changedCells.length > 0) {
        await editCells(docIdRef.current.id, changedCells);
      }
    }
  };

  const renderedCells = cells.map((cell) => (
    <React.Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </React.Fragment>
  ));
  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {renderedCells}
      <div className="save-container">
        <button
          onClick={handleSaveDocClick}
          className="saveBtn button is-primary is-rounded"
        >
          Save Documentation
        </button>
      </div>
    </div>
  );
};

export default CellList;
