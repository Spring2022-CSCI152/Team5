import {convMinSec, formatSeconds} from "../services/TimeMath";

test('converts 1 minute to 60 seconds', () => {
    expect(convMinSec(1)).toBe(60);
})

test('formatting 90 seconds returns 1:30', () => {
    expect(formatSeconds(90)).toBe('1:30')
})

test('formatting 0 returns 0:00', () => {
    expect(formatSeconds(0)).toBe('0:00')
})