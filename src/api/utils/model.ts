import { Request } from "@/types/request";
import { isAdminUser } from "./auth";

export const filterRecordFields = async (record: any, type: "hiddenAttributes" | "guardedAttributes", req?: Request, modelConfig?: any, includedFields: string[] = [], excludedFields: string[] = []) => {
    if (!record) return null;

    if (req && !isAdminUser(req)) {
        let attributeList = [...(modelConfig && modelConfig[type] || []), ...includedFields];
        attributeList = attributeList.filter((attr) => !excludedFields.includes(attr));  // Removes excludedFields from attributeList

        if (Array.isArray(record)) {
            return record.map((item) => {
                return Object.fromEntries(Object.entries(item).filter(([key]) => !attributeList.includes(key)));
            });
        }

        const recordData = typeof record === "object" ? { ...record } : record;
        attributeList.forEach((attr) => {
            delete recordData[attr];
        });

        return recordData;
    }

    return record;
};
export const filterHiddenFields = async (record: any, req?: Request, modelConfig?: any, includedFields?: string[] | null, excludedFields?: string[] | null) => {
    return filterRecordFields(record, "hiddenAttributes", req, modelConfig, includedFields || [], excludedFields || []);
};
export const filterGuardedFields = async (record: any, req?: Request, modelConfig?: any, includedFields?: string[] | null, excludedFields?: string[] | null) => {
    return filterRecordFields(record, "guardedAttributes", req, modelConfig, includedFields || [], excludedFields || []);
};