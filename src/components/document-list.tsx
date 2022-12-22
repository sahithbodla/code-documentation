import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const lastRecordIndex = currentPage * recordsPerPage;
  const firstRecordIndex = lastRecordIndex - recordsPerPage;

  const nPages = Math.ceil(documentList.length / recordsPerPage);
  const currentDocs = documentList
    .filter(({ name, id }) => {
      if (
        name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        id === search
      )
        return true;
      return false;
    })
    .slice(firstRecordIndex, lastRecordIndex);

  if (documentList.length === 0) {
    return (
      <div className="no-docs-container">
        <h1 className="title">Welcome to CodeBook</h1>
        <h1 className="subtitle">
          The place where you can code and document at the same time!
        </h1>
        <button
          className="button is-primary"
          onClick={() => {
            navigate('/create');
          }}
        >
          Create Document
        </button>
      </div>
    );
  }
  return (
    <article className="panel is-primary doc-list-container">
      <p className="panel-heading">All Documents</p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            type="text"
            placeholder="Search Document"
            className="input is-primary"
            onChange={(e) => setSearch(e.target.value)}
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
