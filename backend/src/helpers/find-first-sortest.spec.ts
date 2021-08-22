import findFirstSorted from './find-first-sorted';

describe('find-first-sorted',() => {
    it('should return the closest value in a sorted array', () => {
        const arr = [1,2,4,6,10,24,53,67,89,90,105,205,5004,30004]
        for(let i = 0; i<5;i++) {
            const targets = [38,11,107,50000,1000];
            const goals = [24,10,105,30004,205]
            const firstSortedIndex = findFirstSorted(arr,targets[i]);
            expect(arr[firstSortedIndex]).toBe(goals[i])
        }
    })
})