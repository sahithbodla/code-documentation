import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import './add-cell.css';
import { useActions, useTypedSelector } from '../hooks';
import { randomId, setToast } from '../utils';
import { CellTypes } from '../state';
import { addCell, setOrder, getOrder } from '../api';

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({
  prevCellId,
  forceVisible = false,
}) => {
  const { insertCellAfter, addServiceData } = useActions();
  const { data } = useTypedSelector((state) => state.cells.serviceData);
  const docIdRef = useRef(useParams());

  const handleCellInsertion = async (type: CellTypes) => {
    const cellId = randomId();
    insertCellAfter(prevCellId, type, cellId);
    if (docIdRef.current.id) {
      const order = await getOrder(docIdRef.current.id);
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
      addServiceData({
        order: order2,
        data: { ...data, [cellId]: { id: cellId, type, content: '' } },
      });
      await addCell(docIdRef.current.id, type, cellId);
      setToast(`Added ${type[0].toUpperCase() + type.slice(1)} Cell`);
      await setOrder(docIdRef.current.id, order2);
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
