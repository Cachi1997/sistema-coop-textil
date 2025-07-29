import { useState } from "react";

interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
}

export const useModal = () => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    title: "",
    message: "",
  });

  const showModal = (title: string, message: string) => {
    setModal({
      isOpen: true,
      title,
      message,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      title: "",
      message: "",
    });
  };

  return {
    modal,
    showModal,
    closeModal,
  };
};
