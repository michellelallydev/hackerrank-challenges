//arr = [5, 3, 1, 2, 4]
arr = [0,1,2,3,4,5,6]
function findMedian(arr) {
    arr.sort(function(a, b) {
        return a - b;
    });

    let middle = Math.floor(arr.length/2);

    if (arr.length % 2 !== 0) {
        return arr[middle];
    } 
    
    return (arr[middle - 1] + arr[middle]) / 2;
    
}

console.log(findMedian(arr))