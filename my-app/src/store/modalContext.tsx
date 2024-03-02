import React, { createContext, useState, useContext } from "react";
import { ModalContext as ModalContextType } from "../types/ModalContext";

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistModalOpen, setIsHistModalOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        isHistModalOpen,
        setIsHistModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
