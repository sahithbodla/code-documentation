import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTypedSelector, useActions } from '../hooks';
import { getDocument, saveNewDocument } from '../api';
import { getNewDocumentObj } from '../utils';
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
        console.log(response2);
        if (response2.success) {
          loadInitData(response2.document.order, response2.document.data);
        } else {
          // TODO: Handle failure reponse
        }
      }
    };
    dummy();
  }, []);

  const handleSaveDocClick = async () => {
    if (!docIdRef.current.id) {
      const dataObj = getNewDocumentObj(docInfo.order, docInfo.data);
      console.log('dataobj', dataObj);
      const response = await saveNewDocument(dataObj);
      console.log('response', response);
      if (response.success) {
        navigate(`/${response.documentId}`);
      } else {
        // TODO: Handle failure reponse
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
