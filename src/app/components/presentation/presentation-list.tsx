"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { PresentationItemType } from "@/types/presentation";
import { useModal } from "@/store/useModal";
import { presentationService } from "@/lib/presentation";
import PresentationItem from "@/components/presentation/presentation-item";
import { createPresentationItemsSkeleton } from "@/components/ui/skeletons/presentation";
import { PRESENTATION_CREATED } from "@/utils/events";

const EditPresentationModal = dynamic(() => import('@/components/modals/presentation/edit-modal').then(mod => mod.EditPresentationModal), { ssr: false });
const DeletePresentationModal = dynamic(() => import('@/components/modals/presentation/delete-modal').then(mod => mod.DeletePresentationModal), { ssr: false });
const RestorePresentationModal = dynamic(() => import('@/components/modals/presentation/restore-modal').then(mod => mod.RestorePresentationModal), { ssr: false });

export default function PresentationList() {
    const { isModalOpen, modalName } = useModal();
    const [presentations, setPresentations] = useState<any>(null);

    const fetchPresentationsData = useCallback(async () => {
        try {
            const response = await presentationService.list();
            setPresentations(response.data);
        } catch (error) {
            console.error('Error fetching presentations:', error);
        }
    }, []);

    useEffect(() => {
        fetchPresentationsData();

        window.addEventListener(PRESENTATION_CREATED, fetchPresentationsData as EventListener);
        return () => {
            window.removeEventListener(PRESENTATION_CREATED, fetchPresentationsData as EventListener);
        };
    }, [fetchPresentationsData]);

    const memoizedPresentationItems = useMemo(() => {
        return presentations?.items?.map((presentation: PresentationItemType) => (
            <PresentationItem
                key={presentation.id}
                data={presentation}
            />
        ));
    }, [presentations?.items]);

    return (
        <>
            <div className="space-y-1 mb-5">
                <h3 className="text-sm font-medium text-tertiary">Decks</h3>
                <h4 className="text-xs font-medium text-[#9AA0AB]">
                    {presentations?.meta?.total || 0}{' '}{presentations?.meta?.total > 1 ? 'files' : 'file'}
                </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-5 xl:gap-x-2">
                {presentations ? memoizedPresentationItems : createPresentationItemsSkeleton(24)}
            </div>
            {isModalOpen && modalName === 'EditPresentationModal' && <EditPresentationModal />}
            {isModalOpen && modalName === 'DeletePresentationModal' && <DeletePresentationModal />}
            {isModalOpen && modalName === 'RestorePresentationModal' && <RestorePresentationModal />}
        </>
    );
}