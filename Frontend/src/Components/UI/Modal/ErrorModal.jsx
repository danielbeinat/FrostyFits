import Modal from "./Modal";

const ErrorModal = ({ isOpen, onClose, title, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      message={message}
      type="error"
    />
  );
};

export default ErrorModal;
