import React from 'react';
import { useActions, useTypedSelector } from '../hooks';
import { deleteCell as deleteCellInDB, editCells, setOrder } from '../api';
import './action-bar.css';
import { Direction } from '../state/actions';
import { Cell } from '../state';
import { setToast } from '../utils';
import { TOAST_DELETE, TOAST_FAIL, TOAST_MOVE_FAIL } from '../constants';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { deleteCell, moveCell, deleteBundle, addServiceData } = useActions();
  const {
    order,
    docId,
    serviceData: { order: order2, data },
  } = useTypedSelector((state) => state.cells);

  const handleDeleteCell = async (id: string) => {
    if (docId) {
      const dResponse = await deleteCellInDB(docId, id);
      if (dResponse.success) {
        const data2 = Object.entries(data).reduce(
          (acc: { [key: string]: Cell }, [key, value]: [string, Cell]) => {
            if (key !== id) {
              acc[key] = value;
            }
            return acc;
          },
          {}
        );
        const oResponse = await setOrder(
          docId,
          order.filter((id2) => id2 !== id)
        );
        if (oResponse.success) {
          addServiceData({ order: order2, data: data2 });
          deleteCell(id);
          deleteBundle(id);
          setToast(TOAST_DELETE);
        } else {
          await editCells(docId, [
            { cellId: id, type: data[id].type, content: data[id].content },
          ]);
          setToast(TOAST_FAIL);
        }
      } else {
        setToast(TOAST_FAIL);
      }
    }
  };
  const handleMoveCell = async (id: string, dir: Direction) => {
    let order2 = [...order];
    if (docId) {
      const index = order2.findIndex((id2) => {
        return id2 === id;
      });
      const targetIndex = dir === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > order2.length - 1) {
        return;
      }
      order2[index] = order2[targetIndex];
      order2[targetIndex] = id;
      const oResponse = await setOrder(docId, order2);
      if (oResponse.success) {
        moveCell(id, dir);
      } else {
        setToast(TOAST_MOVE_FAIL);
      }
    } else {
      moveCell(id, dir);
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
