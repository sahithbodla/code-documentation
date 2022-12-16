import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './document-list.css';
import { getAllDocumentsByUser } from '../api';
import { tempUserId } from '../constants';

const DocumentList: React.FC = () => {
  const [documentsList, setDocumentsList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async function dummy() {
      const response = await getAllDocumentsByUser(tempUserId);
      setDocumentsList(response.documents);
    })();
  }, [documentsList]);
  return (
    <article className="panel is-success doc-list-container">
      <p className="panel-heading">All Documents</p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            type="text"
            placeholder="Search Document"
            className="input is-primary"
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      {documentsList.map(({ name, id }) => {
        return (
          <div
            key={id}
            className="panel-block hover-pointer"
            onClick={() => {
              navigate(`/${id}`);
            }}
          >
            {name}
          </div>
        );
      })}
    </article>
  );
};

export default DocumentList;
