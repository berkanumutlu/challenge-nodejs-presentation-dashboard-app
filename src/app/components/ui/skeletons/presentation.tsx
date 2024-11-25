import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export function createPresentationItemsSkeleton(count: number = 25) {
    return [...Array(count)].map((_, idx) => <PresentationItemSkeleton key={idx} />);
};
export function PresentationItemSkeleton() {
    return (
        <Card className="p-4 w-full md:w-80 xl:w-72 relative shadow-[5px_5px_8px_0px_rgba(0,0,0,.05)] animate-pulse">
            <CardHeader className="p-0 mb-3">
                <div className="mb-1 space-x-5 flex flex-row items-center justify-between">
                    <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                </div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="w-full mb-5 relative">
                    <div className="w-full h-36 bg-gray-200 rounded"></div>
                </div>
            </CardContent>
            <CardFooter className="p-0 flex justify-end">
                <div className="h-3 w-2/4 bg-gray-200 rounded"></div>
            </CardFooter>
        </Card>
    );
};