import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ConfirmationBox = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmation</h5>
            <button type="button" className="close" onClick={onCancel}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to accept this ride request?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onConfirm}>
              Yes
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationBox;
