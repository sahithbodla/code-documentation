import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './document-list.css';
import { getAllDocumentsByUser } from '../api';
import { tempUserId } from '../constants';

const DocumentList: React.FC = () => {
  const [documentsList, setDocumentsList] = useState([]);
  useEffect(() => {
    (async function dummy() {
      const response = await getAllDocumentsByUser(tempUserId);
      setDocumentsList(response.documents);
    })();
  }, []);
  return (
    <article className="panel is-primary doc-list-container">
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
          <Link
            key={id}
            className="panel-block hover-pointer"
            to={`document/${id}`}
          >
            {name}
          </Link>
        );
      })}
    </article>
  );
};

export default DocumentList;
