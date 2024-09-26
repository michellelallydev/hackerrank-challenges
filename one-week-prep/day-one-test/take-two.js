arr = [5,3,1,2,4]

function findMedian(arr) {
    arr.sort(function(a, b) {
        return a - b;
    });

    let middle = Math.floor(arr.length/2);
    let median = 0;

    if (middle % 2 !== 0) {
       median = (arr[middle - 1] + arr[middle]) / 2;
    } else 
        median = arr[middle];

    console.log(median)

    // return middle % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;
}

findMedian(arr)