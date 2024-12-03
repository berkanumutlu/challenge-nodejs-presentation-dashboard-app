"use client";

import { useState, useCallback, useMemo, memo, useEffect } from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { PresentationItemType } from "@/types/presentation";
import { useModal } from "@/store/useModal";
import { getPresentationImageUrl } from "@/lib/presentation";
import { cn } from "@/lib/utils";
import { areDatesEqual, formatDate, formatDateToAgoString } from "@/utils/date";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PresentationItemMenu } from "./presentation-item-menu";
import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/ui/action-tooltip";
import { PRESENTATION_UPDATED } from "@/utils/events";

interface PresentationItemProps {
    data: PresentationItemType;
}

const PresentationItem = memo(({ data: initialData }: PresentationItemProps) => {
    const { onModalOpen } = useModal();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openPresentationItemMenu = useCallback(() => {
        setIsMenuOpen(true);
    }, []);

    const [data, setData] = useState(initialData);
    useEffect(() => {
        const handlePresentationItemUpdate = (event: CustomEvent) => {
            if (event.detail?.id === data?.id) {
                setData(event.detail);
            }
        };

        window.addEventListener(PRESENTATION_UPDATED, handlePresentationItemUpdate as EventListener);
        return () => {
            window.removeEventListener(PRESENTATION_UPDATED, handlePresentationItemUpdate as EventListener);
        };
    }, [data.id]);

    const presentationItemDate = useMemo(() => {
        if (areDatesEqual(data?.createdAt, data?.updatedAt)) {
            return (
                <>Created: <ActionTooltip side="bottom" label={formatDate({ date: data.createdAt, format: "longDateTime" })}><span>{formatDateToAgoString(data.createdAt)}</span></ActionTooltip></>
            );
        }
        return (
            <>Last update: <ActionTooltip side="bottom" label={formatDate({ date: data.updatedAt, format: "longDateTime" })}><span>{formatDateToAgoString(data.updatedAt)}</span></ActionTooltip></>
        );
    }, [data?.createdAt, data?.updatedAt]);

    return (
        <Card className="p-4 relative shadow-[5px_5px_8px_0px_rgba(0,0,0,.05)] hover:shadow-[5px_5px_8px_5px_rgba(0,0,0,.05)] overflow-hidden">
            <CardHeader className={cn(
                "p-0 mb-3",
                data?.deletedAt && "z-[1] pointer-events-none select-none"
            )}>
                <CardTitle className="mb-1 flex flex-row items-center justify-between text-sm text-[#242424]">
                    <p className="truncate">{data?.name}</p>
                    {isMenuOpen && (
                        <PresentationItemMenu
                            isOpen={isMenuOpen}
                            setIsOpen={setIsMenuOpen}
                            data={data}
                        />
                    )}
                    <Button onClick={openPresentationItemMenu} variant="ghost" className="h-4 p-0 text-[#9AA0AB] focus-visible:ring-0 focus-visible:ring-offset-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </CardTitle>
                <CardDescription className="text-xs font-normal text-[#9AA0AB] z-[1]">
                    {presentationItemDate}
                </CardDescription>
            </CardHeader>
            <CardContent className={cn(
                "mb-5 p-0 relative",
                data?.deletedAt && "z-[1] pointer-events-none select-none"
            )}>
                <Image
                    src={getPresentationImageUrl(data.thumbnailImage)}
                    alt={data?.name}
                    width={250}
                    height={144}
                    priority
                    className="w-full h-36 object-cover"
                />
            </CardContent>
            <CardFooter className={cn(
                "p-0 flex justify-end",
                data?.deletedAt && "z-[1] pointer-events-none select-none"
            )}>
                <p className="text-xs font-normal text-[#9AA0AB]">by {data?.User?.firstName + ' ' + data?.User?.lastName}</p>
            </CardFooter>
            {isMenuOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg transition-opacity duration-200 pointer-events-none"></div>
            )}
            {data?.deletedAt && (
                <div className="group absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-60 rounded-lg transition-all duration-200 z-10">
                    <div className="space-y-4 w-full h-full flex flex-col justify-center items-center text-white">
                        <div className="hidden group-hover:inline-block text-sm">
                            <ActionTooltip label={formatDate({ date: data.deletedAt, format: "longDateTime" })}>
                                <span>Deleted at:  {formatDateToAgoString(data.deletedAt)}</span>
                            </ActionTooltip>
                        </div>
                        <Button
                            onClick={() => onModalOpen('RestorePresentationModal', { presentation: data })}
                            className="hidden group-hover:flex bg-primary hover:bg-secondary"
                        >
                            Restore
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
});

PresentationItem.displayName = 'PresentationItem';
export default PresentationItem;