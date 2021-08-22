export default function seperator(indexer: number) {
    const splittedArray = indexer.toString().split('.');
    return {timestamp: +splittedArray[0],id: +splittedArray[1]}
}