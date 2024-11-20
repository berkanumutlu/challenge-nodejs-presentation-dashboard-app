import bcrypt from "bcryptjs";
import slugify from "slugify";
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
                    if (field in updatedItem && typeof updatedItem[field] === "string") {
                        updatedItem[field] = await encryptText(updatedItem[field]);
                    }
                }
                return updatedItem;
            })
        );
    } else {
        const updatedItem = { ...data };
        for (const field of fields) {
            if (field in updatedItem && typeof updatedItem[field] === "string") {
                updatedItem[field] = await encryptText(updatedItem[field]);
            }
        }
        return updatedItem;
    }
};
export const slugifyText = (text: string): string => {
    return slugify(text, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true,       // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        locale: 'en',      // language code of the locale to use
        trim: true         // trim leading and trailing replacement chars, defaults to `true`
    });
};
export const getRandomEnumValue = <T>(enumObject: T): T[keyof T] => {
    const values = Object.values(enumObject as Array<T>) as T[keyof T][];
    return values[Math.floor(Math.random() * values.length)];
};