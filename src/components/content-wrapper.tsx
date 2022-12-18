import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CellList from './cell-list';
import DocumentList from './document-list';
import NavBar from './nav-bar';

const ContentWrapper: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<DocumentList />}></Route>
        <Route path="/create" element={<CellList />}></Route>
        <Route path="/document/:id" element={<CellList />}></Route>
      </Routes>
    </div>
  );
};

export default ContentWrapper;
