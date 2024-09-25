var arr = [1, 2, 3, 4, 5];

function minMaxSum(arr) {
    let sum = arr.reduce((a, b) => a + b);
    let maxNum = Math.max(...arr);
    let minNum = Math.min(...arr);

    console.log((sum - maxNum), (sum - minNum))
}

minMaxSum(arr)