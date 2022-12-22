import React from 'react';
import { useTypedSelector } from '../hooks';

interface ISaveButtonProps {
  docId?: string | undefined;
  saveChanges: Function;
}

const SaveButton: React.FC<ISaveButtonProps> = ({
  docId = '',
  saveChanges,
}) => {
  const isChanged = useTypedSelector((state) => state.cells.isChanged);
  return (
    <div className="save-container display-inline-block">
      <button
        onClick={() => saveChanges()}
        className={`saveBtn button is-small ${
          docId ? 'move-up' : 'save-margin'
        } is-primary ${!docId && 'js-modal-trigger'}`}
        data-target="modal-js-example"
        style={{ display: isChanged ? 'inline' : 'none' }}
      >
        Save
      </button>
    </div>
  );
};

export default SaveButton;
