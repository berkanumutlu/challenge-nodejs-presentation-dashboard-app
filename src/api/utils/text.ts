import bcrypt from "bcryptjs";
import { bcryptConfig } from "@/config";

export const encryptText = async (text: string, rounds: number = bcryptConfig.saltRounds): Promise<string> => {
    const salt = await bcrypt.genSalt(rounds);
    return await bcrypt.hash(text, salt);
};
export const isEncrypted = async (text: string): Promise<boolean> => {
    return text.startsWith('$2b$' + bcryptConfig.saltRounds + '$');
};
export const compareBcryptText = async (text: string, encryptedText: string): Promise<boolean> => {
    return await bcrypt.compare(text, encryptedText);
};
export const encryptFields = async (data: Record<string, any> | Record<string, any>[], fields: string[]): Promise<Record<string, any> | Record<string, any>[]> => {
    if (Array.isArray(data)) {
        return Promise.all(
            data.map(async (item) => {
                const updatedItem = { ...item };
                for (const field of fields) {
                    if (field in updatedItem && typeof updatedItem[field] === "string" && !await isEncrypted(updatedItem[field])) {
                        updatedItem[field] = await encryptText(updatedItem[field]);
                    }
                }
                return updatedItem;
            })
        );
    } else {
        const updatedItem = { ...data };
        for (const field of fields) {
            if (field in updatedItem && typeof updatedItem[field] === "string" && !await isEncrypted(updatedItem[field])) {
                updatedItem[field] = await encryptText(updatedItem[field]);
            }
        }
        return updatedItem;
    }
};