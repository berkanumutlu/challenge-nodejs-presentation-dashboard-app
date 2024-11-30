import { create } from "zustand";

interface ModalState {
    modalName: string | null;
    modalData?: any;
    isModalOpen: boolean;
    onModalOpen: (modalName: string, modalData?: any) => void;
    onModalClose: () => void;
}

export const useModal = create<ModalState>((set) => ({
    modalName: null,
    modalData: null,
    isModalOpen: false,
    onModalOpen: (modalName, modalData = {}) => set({ modalName, modalData, isModalOpen: true }),
    onModalClose: () => set({ modalName: null, modalData: null, isModalOpen: false })
}));
