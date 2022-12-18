import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './document-list.css';
import Pagination from './pagination';

interface Document {
  name: string;
  id: string;
}

interface IDocumentsListProps {
  documentList: Array<Document>;
  recordsPerPage: number;
}

const DocumentList: React.FC<IDocumentsListProps> = ({
  documentList,
  recordsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const lastRecordIndex = currentPage * recordsPerPage;
  const firstRecordIndex = lastRecordIndex - recordsPerPage;

  const nPages = Math.ceil(documentList.length / recordsPerPage);
  const currentDocs = documentList.slice(firstRecordIndex, lastRecordIndex);

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
      {documentList.length > recordsPerPage && (
        <div className="panel-block">
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
      {currentDocs.map(({ name, id }) => {
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
