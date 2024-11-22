import Image from "next/image";
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
    onDelete: () => void;
}

export default function PresentationItem({ data, onRenameClick, onDelete }: PresentationItemProps) {
    return (
        <Card className="w-full md:w-80 lg:w-72 p-4">
            <CardHeader className="p-0 mb-3">
                <CardTitle className="mb-1 space-x-5 flex flex-col justify-between md:flex-row text-sm text-[#242424]">
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap">{data.name}</p>
                    <PresentationItemMenu
                        onRenameClick={onRenameClick}
                        onDelete={onDelete}
                    />
                </CardTitle>
                <CardDescription className="text-xs font-normal text-[#9AA0AB]">
                    Last update: {new Date(data.updatedAt).toLocaleDateString()}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="w-full mb-5">
                    <Image
                        src={data.thumbnailImage || "/presentation/placeholder.png"}
                        alt={data.name}
                        width={250}
                        height={141}
                        priority
                        className="w-full h-36 object-cover"
                    />
                </div>
            </CardContent>
            <CardFooter className="p-0 flex justify-end">
                <p className="text-xs font-normal text-[#9AA0AB]">by {data.User.firstName}</p>
            </CardFooter>
        </Card>
    );
}