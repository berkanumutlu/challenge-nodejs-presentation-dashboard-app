import { NextResponse } from "next/server";
import { uploadFile } from "@/lib/upload";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const directory = formData.get('directory') as string;

        if (!file || !directory) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid file or directory.',
                    data: {}
                },
                { status: 400 }
            );
        }

        const uploadFileResponse = await uploadFile(file, directory);
        const { status, ...otherDatas } = uploadFileResponse;

        return NextResponse.json(otherDatas, { status });
    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'File upload failed.',
                data: {}
            }, { status: 500 }
        );
    }
}
