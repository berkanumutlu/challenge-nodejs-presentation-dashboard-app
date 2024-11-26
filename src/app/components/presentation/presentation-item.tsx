"use client";

import { useState } from "react";
import Image from "next/image";
import { presentationPlaceholderImageUrl } from "@/lib/presentation";
import { formatDateToString } from "@/utils/date";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PresentationItemMenu } from "./presentation-item-menu";

interface PresentationItemProps {
    data: {
        id: string;
        name: string;
        thumbnailImage: string | null;
        status: boolean;
        updatedAt: string;
        User: {
            firstName: string;
            lastName: string;
            email: string;
            avatar: string;
            createdAt: string;
        }
    };
    onRenameClick: () => void;
    onDeleteClick: () => void;
}

export default function PresentationItem({ data, onRenameClick, onDeleteClick: onDeleteClick }: PresentationItemProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Card className="p-4 w-full md:w-80 xl:w-72 relative shadow-[5px_5px_8px_0px_rgba(0,0,0,.05)] hover:shadow-[5px_5px_8px_5px_rgba(0,0,0,.05)]">
            <CardHeader className="p-0 mb-3">
                <CardTitle className="mb-1 flex flex-row items-center justify-between text-sm text-[#242424]">
                    <p className="truncate">{data.name}</p>
                    <PresentationItemMenu
                        isOpen={isMenuOpen}
                        setIsOpen={setIsMenuOpen}
                        onRenameClick={onRenameClick}
                        onDeleteClick={onDeleteClick}
                    />
                </CardTitle>
                <CardDescription className="text-xs font-normal text-[#9AA0AB]">
                    Last update: {formatDateToString(data.updatedAt)}
                </CardDescription>
            </CardHeader >
            <CardContent className="p-0">
                <div className="w-full mb-5 relative">
                    <Image
                        src={data.thumbnailImage || presentationPlaceholderImageUrl}
                        alt={data.name}
                        width={250}
                        height={141}
                        priority
                        className="w-full h-36 object-cover"
                    />
                    {isMenuOpen && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg transition-opacity duration-200"></div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-0 flex justify-end">
                <p className="text-xs font-normal text-[#9AA0AB]">by {data.User.firstName + ' ' + data.User.lastName}</p>
            </CardFooter>
            {isMenuOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg transition-opacity duration-200 pointer-events-none"></div>
            )}
        </Card >
    );
}