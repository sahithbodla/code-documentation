import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAllDocumentsByUser } from '../api';
import { tempUserId } from '../constants';
import CellList from './cell-list';
import DocumentList from './document-list';
import NavBar from './nav-bar';

const ContentWrapper: React.FC = () => {
  const [documentList, setDocumentList] = useState([]);
  useEffect(() => {
    (async function dummy() {
      const response = await getAllDocumentsByUser(tempUserId);
      setDocumentList(response.documents);
    })();
  }, []);
  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <DocumentList documentList={documentList} recordsPerPage={8} />
          }
        ></Route>
        <Route path="/create" element={<CellList />}></Route>
        <Route path="/document/:id" element={<CellList />}></Route>
      </Routes>
    </div>
  );
};

export default ContentWrapper;
