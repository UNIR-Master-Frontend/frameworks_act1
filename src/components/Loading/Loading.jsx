'use client';
import './styles.css';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay visible" onClick={onClose}></div>
      <div className="modal visible">
        <div className="modal-container">
          <button className="btn-close" onClick={onClose}>x</button>
          {children}
        </div>
      </div>
    </>
  );
}