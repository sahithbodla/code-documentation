import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTypedSelector, useActions } from '../hooks';
import { getDocument, saveNewDocument, editCells } from '../api';
import { getNewDocumentObj, getChangedCells } from '../utils';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import './cell-list.css';

const CellList: React.FC = () => {
  const docIdRef = useRef(useParams());
  const [docName, setDocName] = useState<string>();
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

  const saveChanges = async () => {
    if (docIdRef.current.id) {
      const oldDocument = await getDocument(docIdRef.current.id);
      const newData = docInfo.data;
      const changedCells = getChangedCells(oldDocument.document.data, newData);
      if (changedCells.length > 0) {
        await editCells(docIdRef.current.id, changedCells);
      }
    }
  };

  const saveNewDoc = async () => {
    const dataObj = getNewDocumentObj(docInfo.order, docInfo.data, docName);
    const response = await saveNewDocument(dataObj);
    if (response.success) {
      navigate(`/${response.documentId}`);
      window.location.reload();
    } else {
      // TODO: Handle failure reponse
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
        {docIdRef.current.id ? (
          <button
            onClick={saveChanges}
            className="saveBtn button is-primary is-rounded"
          >
            Save Changes
          </button>
        ) : (
          <button
            className="saveBtn button is-primary is-rounded js-modal-trigger"
            data-target="modal-js-example"
          >
            Save Documentation
          </button>
        )}
      </div>
      <div id="modal-js-example" className="modal">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Name your "Documentation"</p>
            <button className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  placeholder="e.g., Code like Master"
                  onChange={(e) => {
                    setDocName(e.target.value);
                  }}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-duotone fa-file"></i>
                </span>
              </p>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-success"
              onClick={saveNewDoc}
              disabled={docName ? false : true}
            >
              Save Document
            </button>

            <button className="button">Cancel</button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CellList;
