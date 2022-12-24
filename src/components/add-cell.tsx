import React from 'react';
import './add-cell.css';
import { useActions, useTypedSelector } from '../hooks';
import { randomId, setToast } from '../utils';
import { CellTypes } from '../state';
import { addCell, setOrder, getOrder, deleteCell } from '../api';
import { TOAST_ADD_CELL, TOAST_ADD_CELL_FAIL, TOAST_FAIL } from '../constants';

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({
  prevCellId,
  forceVisible = false,
}) => {
  const { insertCellAfter, addServiceData } = useActions();
  const { docId, data } = useTypedSelector((state) => {
    return { docId: state.cells.docId, data: state.cells.serviceData.data };
  });

  const handleCellInsertion = async (type: CellTypes) => {
    const cellId = randomId();
    if (docId) {
      const cResponse = await addCell(docId, type, cellId);

      if (cResponse.success) {
        const order = await getOrder(docId);
        const foundIndex = order.order.findIndex(
          (id: string) => id === prevCellId
        );
        let order2: string[] = [];
        if (foundIndex === -1) {
          order2 = [...order.order];
          order2.unshift(cellId);
        } else {
          order2 = [...order.order];
          order2.splice(foundIndex + 1, 0, cellId);
        }
        const oResponse = await setOrder(docId, order2);
        if (oResponse.success) {
          insertCellAfter(prevCellId, type, cellId);
          addServiceData({
            order: order2,
            data: { ...data, [cellId]: { id: cellId, type, content: '' } },
          });
          setToast(
            type[0].toUpperCase() + type.slice(1) + ` ${TOAST_ADD_CELL}`
          );
        } else {
          await deleteCell(docId, cellId);
          setToast(TOAST_FAIL);
        }
      } else {
        if ((cResponse.message = 'duplicate_cell_id')) {
          setToast(TOAST_ADD_CELL_FAIL);
        }
      }
    } else {
      insertCellAfter(prevCellId, type, cellId);
    }
  };

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={(e) => handleCellInsertion('code')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={(e) => handleCellInsertion('text')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
