import { create } from "zustand";

interface ModalState {
    modalName: string | null;
    modalData: Record<string, any> | null;
    isModalOpen: boolean;
    onModalOpen: (modalName: string, modalData?: Record<string, any>) => void;
    onModalClose: () => void;
}

export const useModal = create<ModalState>((set) => ({
    modalName: null,
    modalData: null,
    isModalOpen: false,
    onModalOpen: (modalName, modalData = {}) => set({ modalName, modalData, isModalOpen: true }),
    onModalClose: () => set({ modalName: null, modalData: null, isModalOpen: false })
}));
