import { sortByBuildNumber,nextBuildNumber } from '../src/sort';

describe('sortByBuildNumber', () => {
    it('sort build numbers', () => {
        const arr = [ '1.2.3-3', '1.2.3-1', '1.2.3-2']
        
        const want = [ '1.2.3-1', '1.2.3-2', '1.2.3-3']
        const got = sortByBuildNumber(arr)

        expect(got).toEqual(want);
    });

    it('sort mix of build numbers and no build numbers', () => {
        const arr = [ '1.2.3-2', '1.2.3', '1.2.3-0', '1.2.3-1']

        const want = [ '1.2.3', '1.2.3-0','1.2.3-1', '1.2.3-2']
        const got = sortByBuildNumber(arr)

        expect(got).toEqual(want);
    });

    it('sort mix of build numbers and no build numbers', () => {
        const arr = [ '1.2.3-2', '1.2.3', '1.2.3-0', '1.2.3-1']

        const want = [ '1.2.3', '1.2.3-0','1.2.3-1', '1.2.3-2']
        const got = sortByBuildNumber(arr)

        expect(got).toEqual(want);
    });
});


describe('nextBuildNumber', () => {
    const testCases = new Map([
        ['expected build number', { arr: [ '1.2.3-2', '1.2.3', '1.2.3-0', '1.2.3-1'], expected: 3}],
        ['empty array', { arr: [], expected: 0}],
        ['no build number', {arr: [ '1.1.1'], expected: 0}],
        ['no build number, multiple', {arr: [ '1.1.1', '2.1.2'], expected: 0}],
        ['null', {arr: null as any, expected: 0}],
        ['link', {arr: ['https://google.com/11.2/', 'https://google.com/11.2-2/'], expected: 3}]
    ])

    for(const [testName, { arr, expected}] of testCases.entries()){
        test(`${testName} - given [${arr}] should be ${expected}`, () => {
            expect(nextBuildNumber(arr)).toBe(expected);
        })
    }
})