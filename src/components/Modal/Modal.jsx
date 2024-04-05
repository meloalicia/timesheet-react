import './styles.css';

function Modal({ isOpen, onClose, children = "Fallback content" }) {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
