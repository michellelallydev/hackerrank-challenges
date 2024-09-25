var arr = [1,2,3,4,5];

function minMaxSum(arr) {
    let minSum = 0, maxSum = 0, minNum = 0, maxNum = 0, sum = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > maxNum) {
            maxNum = arr[i]
        }
    }

    minNum = maxNum

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < minNum) {
            minNum = arr[i]
        }
        sum += arr[i]
    }

    minSum = sum - maxNum
    maxSum = sum - minNum

    console.log(minSum, maxSum) 
}

minMaxSum(arr)