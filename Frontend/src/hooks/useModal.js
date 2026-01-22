import { useState } from 'react';

export const useModal = () => {
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info',
        showCloseButton: true,
    });

    const openModal = (config) => {
        setModalState({
            isOpen: true,
            title: config.title || '',
            message: config.message || '',
            type: config.type || 'info',
            showCloseButton: config.showCloseButton !== false,
        });
    };

    const closeModal = () => {
        setModalState(prev => ({ ...prev, isOpen: false }));
    };

    const showError = (message, title = 'Error') => {
        openModal({ title, message, type: 'error' });
    };

    const showSuccess = (message, title = 'Éxito') => {
        openModal({ title, message, type: 'success' });
    };

    const showWarning = (message, title = 'Advertencia') => {
        openModal({ title, message, type: 'warning' });
    };

    const showInfo = (message, title = 'Información') => {
        openModal({ title, message, type: 'info' });
    };

    return {
        ...modalState,
        openModal,
        closeModal,
        showError,
        showSuccess,
        showWarning,
        showInfo,
    };
};
