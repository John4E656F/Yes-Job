import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeModal: () => void;
}
export const Modal = ({ isOpen, onClose, closeModal }: ModalProps) => {
  return (
    <div
      className={`fixed z-50 inset-0 flex items-center justify-center transition-opacity ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
    >
      <div className='fixed inset-0 bg-gray-800 opacity-50' onClick={closeModal} />
      <article>
        <h1>Hello World</h1>
      </article>
    </div>
  );
};
