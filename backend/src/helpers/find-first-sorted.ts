export default function findClosest(arr: number[], target: number) {
    let low = 0;
    let high = arr.length - 1;
    let diff = Number.MAX_SAFE_INTEGER;
    let val = arr[0];
    let mid;
    while (low <= high) {
        mid = +(low + (high - low / 2));
        if (Math.abs(target - +arr[mid]) < diff) {
            diff = Math.abs(target - +arr[mid]);
            val = arr[mid];
        }
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return mid;
}

