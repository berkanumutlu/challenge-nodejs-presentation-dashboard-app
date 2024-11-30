"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { PresentationItemType } from "@/types/presentation";
import { useModal } from "@/store/useModal";
import { presentationService } from "@/lib/presentation";
import PresentationItem from "@/components/presentation/presentation-item";
import { createPresentationItemsSkeleton } from "@/components/ui/skeletons/presentation";

const EditPresentationModal = dynamic(() => import('@/components/modals/presentation/edit-modal').then(mod => mod.EditPresentationModal), { ssr: false });

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

        window.addEventListener('refreshPresentationList', fetchPresentationsData);
        return () => {
            window.removeEventListener('refreshPresentationList', fetchPresentationsData);
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
            <div className="flex flex-wrap gap-5 xl:gap-x-3">
                {presentations ? memoizedPresentationItems : createPresentationItemsSkeleton(24)}
            </div>
            <>
                {isModalOpen && modalName === 'EditPresentationModal' && <EditPresentationModal />}
            </>
        </>
    );
}