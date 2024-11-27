import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

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

        const uploadPath = path.join(process.cwd(), 'public/uploads', directory);
        await fs.mkdir(uploadPath, { recursive: true });

        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadPath, fileName);
        await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

        // const fileUrlPath = path.join('/', directory, fileName);

        return NextResponse.json({
            success: true,
            message: 'File uploaded successfully.',
            data: { fileName: fileName }
        }, { status: 200 });
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
