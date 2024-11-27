import axios from "axios";

export async function uploadFile(file: File, directory: string) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('directory', directory);

        const response = await axios.post('/api/upload/file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error: any) {
        console.error('File upload error:', error);
        return {
            success: false,
            status: error.response?.status || 500,
            message: error.message || 'File upload failed.',
            data: {}
        };
    }
}
