export type DateFormatType =
    | "shortDate"         // E.g.: 29/11/2024
    | "longDate"          // E.g.: 29 November 2024
    | "shortDateTime"     // E.g.: 29/11/2024 12:30
    | "longDateTime"      // E.g.: 29 November 2024 12:30
    | "time"              // E.g.: 12:30
    | "isoDate"           // E.g.: 2024-11-29
    | "isoDateTime"       // E.g.: 2024-11-29T12:30:00
    | "custom";

export interface FormatDateOptions {
    date: Date | string | null;
    format: DateFormatType;
    customFormat?: string;
    locale?: string;       // Default: "en-US"
}