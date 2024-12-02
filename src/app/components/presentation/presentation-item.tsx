"use client";

import { useState, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { PresentationItemType } from "@/types/presentation";
import { getPresentationImageUrl } from "@/lib/presentation";
import { areDatesEqual, formatDateToString } from "@/utils/date";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PresentationItemMenu } from "./presentation-item-menu";
import { Button } from "@/components/ui/button";

interface PresentationItemProps {
    data: PresentationItemType;
}

const PresentationItem = memo(({ data }: PresentationItemProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openPresentationItemMenu = useCallback(() => {
        setIsMenuOpen(true);
    }, []);

    const presentationData = useMemo(() => data, [data]);

    const presentationItemDate = useMemo(() => {
        if (areDatesEqual(data?.createdAt, data?.updatedAt)) {
            return (
                <>Created: {formatDateToString(data?.createdAt)}</>
            );
        }
        return (
            <>Last update: {formatDateToString(data?.updatedAt)}</>
        );
    }, [data?.createdAt, data?.updatedAt]);

    return (
        <Card className="p-4 w-full md:w-80 xl:w-72 relative shadow-[5px_5px_8px_0px_rgba(0,0,0,.05)] hover:shadow-[5px_5px_8px_5px_rgba(0,0,0,.05)] z-1">
            <CardHeader className="p-0 mb-3">
                <CardTitle className="mb-1 flex flex-row items-center justify-between text-sm text-[#242424]">
                    <p className="truncate">{data.name}</p>
                    {isMenuOpen && (
                        <PresentationItemMenu
                            isOpen={isMenuOpen}
                            setIsOpen={setIsMenuOpen}
                            data={presentationData}
                        />
                    )}
                    <Button onClick={openPresentationItemMenu} variant="ghost" className="h-4 p-0 text-[#9AA0AB] focus-visible:ring-0 focus-visible:ring-offset-0 z-[1]">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </CardTitle>
                <CardDescription className="text-xs font-normal text-[#9AA0AB]">
                    {presentationItemDate}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="w-full mb-5 relative">
                    <Image
                        src={getPresentationImageUrl(data.thumbnailImage)}
                        alt={data.name}
                        width={250}
                        height={141}
                        priority
                        className="w-full h-36 object-cover"
                    />
                </div>
            </CardContent>
            <CardFooter className="p-0 flex justify-end">
                <p className="text-xs font-normal text-[#9AA0AB]">by {data.User.firstName + ' ' + data.User.lastName}</p>
            </CardFooter>
            {isMenuOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg transition-opacity duration-200 pointer-events-none"></div>
            )}
        </Card>
    );
});

PresentationItem.displayName = 'PresentationItem';
export default PresentationItem;