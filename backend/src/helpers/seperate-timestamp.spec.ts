import seperator from './seperate-timestamp-index'

describe('seperator', () => {
    it('should seperate between timestamp and index', () => {
        const index = 105.245
        const {id,timestamp} = seperator(index)
        expect(id).toBe(245);
        expect(timestamp).toBe(105);
    })
})