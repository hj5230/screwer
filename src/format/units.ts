import { type Currency, CurrencySymbols, DEFAULT_CURRENCY } from './currency';
import { DEFAULT_DIGITS, getFallbackString } from './value';

export enum Unit {
    Number = 'number',
    Percent = 'percent',
    Currency = 'currency',
    Date = 'date',
    Time = 'time',
    DateTime = 'dateTime',
}

interface FormatNumberOptions {
    digits?: number;
    fallbackOriginal?: boolean;
    fallback?: string;
}

export function formatNumber<T>(
    value: T,
    options: FormatNumberOptions,
): string {
    const numericValue = Number(value);
    if (Number.isFinite(numericValue)) {
        return numericValue.toFixed(options.digits ?? DEFAULT_DIGITS);
    }
    const { fallbackOriginal, fallback } = options || {};
    return getFallbackString(value, { fallbackOriginal, fallback });
}

interface FormatPercentOptions {
    digits?: number;
    fallbackOriginal?: boolean;
    fallback?: string;
}

export function formatPercent<T>(
    value: T,
    options: FormatPercentOptions,
): string {
    const numericValue = Number(value);
    if (Number.isFinite(numericValue)) {
        return `${(numericValue * 100).toFixed(options.digits ?? DEFAULT_DIGITS)}%`;
    }
    const { fallbackOriginal, fallback } = options || {};
    return getFallbackString(value, { fallbackOriginal, fallback });
}

interface FormatCurrencyOptions extends FormatNumberOptions {
    currency?: Currency;
}

export function formatCurrency<T>(
    value: T,
    options: FormatCurrencyOptions,
): string {
    const numericValue = Number(value);
    if (Number.isFinite(numericValue)) {
        return `${CurrencySymbols[options.currency ?? DEFAULT_CURRENCY]} ${numericValue.toFixed(options.digits ?? DEFAULT_DIGITS)}`;
    }
    const { fallbackOriginal, fallback } = options || {};
    return getFallbackString(value, { fallbackOriginal, fallback });
}

interface FormatDateTimeOptions {
    locale?: Intl.LocalesArgument;
    format?: Intl.DateTimeFormatOptions;
    fallbackOriginal?: boolean;
    fallback?: string;
}

function toValidDate(value: unknown): Date | null {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return value;
    }
    if (typeof value === 'number' || typeof value === 'string') {
        const date = new Date(value as number | string);
        if (!Number.isNaN(date.getTime())) {
            return date;
        }
    }
    return null;
}

export function formatDate<T>(
    value: T,
    options: FormatDateTimeOptions,
): string {
    const date = toValidDate(value);
    if (date) {
        const { locale, format } = options || {};
        const formatter = new Intl.DateTimeFormat(locale, {
            timeZone: 'UTC',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            ...(format ?? {}),
        });
        return formatter.format(date);
    }
    const { fallbackOriginal, fallback } = options || {};
    return getFallbackString(value, { fallbackOriginal, fallback });
}

export function formatTime<T>(
    value: T,
    options: FormatDateTimeOptions,
): string {
    const date = toValidDate(value);
    if (date) {
        const { locale, format } = options || {};
        const formatter = new Intl.DateTimeFormat(locale, {
            timeZone: 'UTC',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            ...(format ?? {}),
        });
        return formatter.format(date);
    }
    const { fallbackOriginal, fallback } = options || {};
    return getFallbackString(value, { fallbackOriginal, fallback });
}

export function formatDateTime<T>(
    value: T,
    options: FormatDateTimeOptions,
): string {
    const date = toValidDate(value);
    if (date) {
        const { locale, format } = options || {};
        const formatter = new Intl.DateTimeFormat(locale, {
            timeZone: 'UTC',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            ...(format ?? {}),
        });
        return formatter.format(date);
    }
    const { fallbackOriginal, fallback } = options || {};
    return getFallbackString(value, { fallbackOriginal, fallback });
}
