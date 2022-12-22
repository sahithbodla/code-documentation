import React from 'react';

interface ISaveButtonProps {
  docId?: string | undefined;
  saveChanges: Function;
}

const SaveButton: React.FC<ISaveButtonProps> = ({
  docId = '',
  saveChanges,
}) => {
  return (
    <div className="save-container display-inline-block">
      <button
        onClick={() => saveChanges()}
        className={`saveBtn button is-small ${
          docId ? 'move-up' : 'save-margin'
        } is-primary ${!docId && 'js-modal-trigger'}`}
        data-target="modal-js-example"
      >
        Save
      </button>
    </div>
  );
};

export default SaveButton;
