import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleRegister = () => {
    onClose();
    navigate("/register");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Iniciar sesión requerido"
      message="Para agregar productos al carrito, necesitas tener una cuenta. ¿Ya tienes una cuenta o deseas crear una nueva?"
      type="warning"
      showCloseButton={true}
    >
      <div className="flex gap-3 justify-center">
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Iniciar sesión
        </button>
        <button
          onClick={handleRegister}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Crear cuenta
        </button>
      </div>
    </Modal>
  );
};

export default LoginModal;
