import { expect, test } from '@rstest/core';
import { Currency, formatValue, Unit } from '../src/index';

test('formatValue - Number', () => {
    expect(formatValue('abc', Unit.Number)).toBe('--');
    expect(
        formatValue('Hello World!', Unit.Number, {
            digits: 1,
            fallbackOriginal: true,
            fallback: '-',
        }),
    ).toBe('Hello World!');
    expect(formatValue(123.45678, Unit.Number, { digits: 2 })).toBe('123.46');
    expect(formatValue('789.12', Unit.Number, { digits: 0 })).toBe('789');
});

test('formatValue - Percent', () => {
    expect(formatValue('xyz', Unit.Percent)).toBe('--');
    expect(formatValue(0.12345678, Unit.Percent, { digits: 2 })).toBe('12.35%');
    expect(formatValue('0.34', Unit.Percent, { digits: 0 })).toBe('34%');
});

test('formatValue - Currency', () => {
    expect(formatValue('def', Unit.Currency)).toBe('--');
    expect(
        formatValue(1234.5678, Unit.Currency, {
            digits: 2,
            currency: Currency.USD,
        }),
    ).toBe('$ 1234.57');
    expect(
        formatValue('8901.23', Unit.Currency, {
            digits: 0,
            currency: Currency.EUR,
        }),
    ).toBe('€ 8901');
});

test('formatValue - Date', () => {
    expect(formatValue('not-a-date', Unit.Date)).toBe('--');
    expect(
        formatValue(new Date('2024-01-15T10:20:30Z'), Unit.Date, {
            locale: 'en-US',
        }),
    ).toBe('1/15/2024');
    expect(
        formatValue(new Date('2024-01-15T10:20:30Z'), Unit.Date, {
            locale: 'de-DE',
        }),
    ).toBe('15.1.2024');
});

test('formatValue - Time', () => {
    expect(formatValue('invalid-date', Unit.Time)).toBe('--');
    expect(
        formatValue(new Date('2024-01-15T10:20:30Z'), Unit.Time, {
            locale: 'en-US',
        }),
    ).toBe('10:20:30 AM');
    expect(
        formatValue(new Date('2024-01-15T10:20:30Z'), Unit.Time, {
            locale: 'de-DE',
        }),
    ).toBe('10:20:30');
});

test('formatValue - DateTime', () => {
    expect(formatValue('bad-date', Unit.DateTime)).toBe('--');
    expect(
        formatValue(new Date('2024-01-15T10:20:30Z'), Unit.DateTime, {
            locale: 'en-US',
        }),
    ).toBe('1/15/2024, 10:20:30 AM');
    expect(
        formatValue(new Date('2024-01-15T10:20:30Z'), Unit.DateTime, {
            locale: 'de-DE',
        }),
    ).toBe('15.1.2024, 10:20:30');
});
