import { isNil } from 'lodash';
import type { Currency } from './currency';
import {
    formatCurrency,
    formatDate,
    formatDateTime,
    formatNumber,
    formatPercent,
    formatTime,
    Unit,
} from './units';

export const DEFAULT_DIGITS = 2;
export const DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DEFAULT_FALLBACK_STRING = '--';

interface GetFallbackStringOptions {
    fallbackOriginal?: boolean;
    fallback?: string;
}

export function getFallbackString<T>(
    value: T,
    options?: GetFallbackStringOptions,
): string {
    if (options?.fallbackOriginal) {
        return String(value);
    }
    return options?.fallback ?? DEFAULT_FALLBACK_STRING;
}

interface FormatValueOptions {
    digits?: number;
    currency?: Currency;
    locale?: Intl.LocalesArgument;
    formatDateTime?: Intl.DateTimeFormatOptions;
    fallbackOriginal?: boolean;
    fallback?: string;
}

export function formatValue<T>(
    value: T,
    unit?: Unit,
    options?: FormatValueOptions,
) {
    switch (unit) {
        case Unit.Number: {
            const { digits, fallbackOriginal, fallback } = options || {};
            return formatNumber(value, { digits, fallbackOriginal, fallback });
        }

        case Unit.Percent: {
            const { digits, fallbackOriginal, fallback } = options || {};
            return formatPercent(value, { digits, fallbackOriginal, fallback });
        }

        case Unit.Date: {
            const { fallbackOriginal, fallback, locale, formatDateTime } =
                options || {};
            return formatDate(value, {
                fallbackOriginal,
                fallback,
                locale,
                format: formatDateTime,
            });
        }

        case Unit.Time: {
            const { fallbackOriginal, fallback, locale, formatDateTime } =
                options || {};
            return formatTime(value, {
                fallbackOriginal,
                fallback,
                locale,
                format: formatDateTime,
            });
        }

        case Unit.DateTime: {
            const {
                fallbackOriginal,
                fallback,
                locale,
                formatDateTime: formatDateTimeOptions,
            } = options || {};
            return formatDateTime(value, {
                fallbackOriginal,
                fallback,
                locale,
                format: formatDateTimeOptions,
            });
        }

        case Unit.Currency: {
            const { digits, currency, fallbackOriginal, fallback } =
                options || {};
            return formatCurrency(value, {
                digits,
                currency,
                fallbackOriginal,
                fallback,
            });
        }

        default: {
            {
                const { fallbackOriginal, fallback } = options || {};
                return isNil(value)
                    ? getFallbackString(value, { fallbackOriginal, fallback })
                    : String(value);
            }
        }
    }
}
