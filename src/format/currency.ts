export enum Currency {
    /** U.S. dollar */
    USD = 'USD',
    /** Euro */
    EUR = 'EUR',
    /** British Pound */
    GBP = 'GBP',
    /** Chinese Yuan */
    CNY = 'CNY',
    /** Japanese Yen */
    JPY = 'JPY',
    /** Hong Kong Dollar */
    HKD = 'HKD',
    /** Russian Ruble */
    RUB = 'RUB',
    /** Australian Dollar */
    AUD = 'AUD',
    /** Canadian Dollar */
    CAD = 'CAD',
    /** Swiss Franc */
    CHF = 'CHF',
    /** Indian Rupee */
    INR = 'INR',
    /** South Korean Won */
    KRW = 'KRW',
    /** Singapore Dollar */
    SGD = 'SGD',
    /** New Zealand Dollar */
    NZD = 'NZD',
    /** Brazilian Real */
    BRL = 'BRL',
    /** Mexican Peso */
    MXN = 'MXN',
    /** South African Rand */
    ZAR = 'ZAR',
    /** Turkish Lira */
    TRY = 'TRY',
    /** Saudi Riyal */
    SAR = 'SAR',
    /** UAE Dirham */
    AED = 'AED',
}

export const DEFAULT_CURRENCY: Currency = Currency.USD;

export const CurrencySymbols: Record<Currency, string> = {
    [Currency.USD]: '$',
    [Currency.EUR]: '€',
    [Currency.GBP]: '£',
    [Currency.CNY]: '¥',
    [Currency.JPY]: 'JP¥',
    [Currency.HKD]: 'HK$',
    [Currency.RUB]: '₽',
    [Currency.AUD]: 'A$',
    [Currency.CAD]: 'C$',
    [Currency.CHF]: 'CHF',
    [Currency.INR]: '₹',
    [Currency.KRW]: '₩',
    [Currency.SGD]: 'S$',
    [Currency.NZD]: 'NZ$',
    [Currency.BRL]: 'R$',
    [Currency.MXN]: 'Mex$',
    [Currency.ZAR]: 'R',
    [Currency.TRY]: '₺',
    [Currency.SAR]: 'SR',
    [Currency.AED]: 'د.إ',
};
