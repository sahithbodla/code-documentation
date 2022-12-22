import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useActions, useTypedSelector } from '../hooks';
import { deleteCell as deleteCellInDB, setOrder } from '../api';
import './action-bar.css';
import { Direction } from '../state/actions';
import { Cell } from '../state';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { deleteCell, moveCell, deleteBundle, addServiceData } = useActions();
  const {
    order,
    serviceData: { order: order2, data },
  } = useTypedSelector((state) => state.cells);
  const docIdRef = useRef(useParams());
  const handleDeleteCell = async (id: string) => {
    deleteCell(id);
    deleteBundle(id);
    if (docIdRef.current.id) {
      await deleteCellInDB(docIdRef.current.id, id);
      const data2 = Object.entries(data).reduce(
        (acc: { [key: string]: Cell }, [key, value]: [string, Cell]) => {
          if (key !== id) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );
      addServiceData({ order: order2, data: data2 });
      await setOrder(
        docIdRef.current.id,
        order.filter((id2) => id2 !== id)
      );
    }
  };
  const handleMoveCell = async (id: string, dir: Direction) => {
    moveCell(id, dir);
    let order2 = [...order];
    if (docIdRef.current.id) {
      const index = order2.findIndex((id2) => {
        return id2 === id;
      });
      const targetIndex = dir === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > order2.length - 1) {
        await setOrder(docIdRef.current.id, order2);
        return;
      }
      order2[index] = order2[targetIndex];
      order2[targetIndex] = id;
      await setOrder(docIdRef.current.id, order2);
    }
  };
  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => handleMoveCell(id, 'up')}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => handleMoveCell(id, 'down')}
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
