import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveNewDocument } from '../api';
import { useActions, useTypedSelector } from '../hooks';
import { getNewDocumentObj } from '../utils';
import SaveButton from './save-button';

interface INewDocumentProps {
  children: React.ReactNode;
  setDocName: Function;
  docName: string;
}

const NewDocument: React.FC<INewDocumentProps> = ({
  children,
  setDocName,
  docName,
}) => {
  const navigate = useNavigate();
  const { setIsChanged } = useActions();
  const docInfo = useTypedSelector((state) => {
    return {
      order: state.cells.order,
      data: state.cells.data,
    };
  });
  useEffect(() => {
    setIsChanged(docInfo.order.length > 0);
  }, [docInfo.order]);
  const saveChanges = () => {
    document.getElementById('modal-js-example')?.classList.add('is-active');
  };
  const saveNewDoc = async () => {
    const dataObj = getNewDocumentObj(docInfo.order, docInfo.data, docName);
    const response = await saveNewDocument(dataObj);
    if (response.success) {
      navigate(`/document/${response.documentId}`);
      window.location.reload();
      document
        .getElementById('modal-js-example')
        ?.classList.remove('is-active');
    } else {
      // TODO: Handle failure reponse
    }
  };
  return (
    <div className="cell-list">
      <SaveButton saveChanges={saveChanges} />
      {children}
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
              onClick={() => saveNewDoc()}
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

export default NewDocument;
