import { FormatDateOptions } from "@/types/text";

export function formatDate({
    date,
    format,
    customFormat,
    locale = "en-US"
}: FormatDateOptions): string {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date provided.");
    }

    const options: Intl.DateTimeFormatOptions = {};
    switch (format) {
        case "shortDate":
            options.year = "numeric";
            options.month = "2-digit";
            options.day = "2-digit";
            break;
        case "longDate":
            options.year = "numeric";
            options.month = "long";
            options.day = "numeric";
            break;
        case "shortDateTime":
            options.year = "numeric";
            options.month = "2-digit";
            options.day = "2-digit";
            options.hour = "2-digit";
            options.minute = "2-digit";
            break;
        case "longDateTime":
            options.year = "numeric";
            options.month = "long";
            options.day = "numeric";
            options.hour = "2-digit";
            options.minute = "2-digit";
            break;
        case "time":
            options.hour = "2-digit";
            options.minute = "2-digit";
            break;
        case "isoDate":
            return parsedDate.toISOString().split("T")[0];
        case "isoDateTime":
            return parsedDate.toISOString();
        case "custom":
            if (!customFormat) {
                throw new Error("Custom format requires a 'customFormat' string.");
            }
            return customFormat
                .replace("YYYY", parsedDate.getFullYear().toString())
                .replace("MM", String(parsedDate.getMonth() + 1).padStart(2, "0"))
                .replace("DD", String(parsedDate.getDate()).padStart(2, "0"))
                .replace("HH", String(parsedDate.getHours()).padStart(2, "0"))
                .replace("mm", String(parsedDate.getMinutes()).padStart(2, "0"))
                .replace("ss", String(parsedDate.getSeconds()).padStart(2, "0"));
        default:
            throw new Error("Invalid format type provided.");
    }

    return new Intl.DateTimeFormat(locale, options).format(parsedDate);
}

export function formatDateToAgoString(date: string | Date | null): string | null {
    if (!date) return null;
    const now = new Date();
    const pastDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - pastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));

    if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        const years = Math.floor(diffDays / 365);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
}

export function areDatesEqual(date1: Date | string | null, date2: Date | string | null): boolean {
    if (!date1 || !date2) return false;
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
        throw new Error('Invalid date format');
    }

    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate() &&
        d1.getHours() === d2.getHours() &&
        d1.getMinutes() === d2.getMinutes() &&
        d1.getSeconds() === d2.getSeconds()
    );
}