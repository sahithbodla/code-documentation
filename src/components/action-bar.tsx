import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useActions, useTypedSelector } from '../hooks';
import { deleteCell as deleteCellInDB, setOrder } from '../api';
import './action-bar.css';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { deleteCell, moveCell, deleteBundle } = useActions();
  const order = useTypedSelector((state) => state.cells.order);
  const docIdRef = useRef(useParams());
  const handleDeleteCell = async (id: string) => {
    deleteCell(id);
    deleteBundle(id);
    if (docIdRef.current.id) {
      await deleteCellInDB(docIdRef.current.id, id);
      await setOrder(
        docIdRef.current.id,
        order.filter((id2) => id2 !== id)
      );
    }
  };
  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, 'up')}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, 'down')}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => {
          handleDeleteCell(id);
        }}
      >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
