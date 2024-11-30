import fs from "fs/promises";
import path from "path";

export async function uploadFile(file: File, directory: string) {
    try {
        const uploadPath = path.join(process.cwd(), 'public/uploads', directory);
        await fs.mkdir(uploadPath, { recursive: true });

        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadPath, fileName);
        await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

        const fileNameWithPath = path.join('/', directory, fileName);

        return {
            success: true,
            status: 200,
            message: 'File uploaded successfully.',
            data: { fileName, filePath, fileNameWithPath }
        };
    } catch (error: any) {
        console.error('File upload error:', error);
        return {
            success: false,
            status: error?.response?.status || 500,
            message: error?.message || 'File upload failed.',
            data: {}
        };
    }
}