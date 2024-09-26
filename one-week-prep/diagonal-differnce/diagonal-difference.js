let arr = [[11, 2, 4], [4, 5, 6], [10, 8, -12]];

function diagonalDifference(arr) {
    let n = arr.length;
    let primary = 0;
    let secondary = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {

            if (i == j)
                primary += arr[i][j];

            if ((i + j) == (n - 1))
                secondary += arr[i][j];
        }

    }
    
    return Math.abs(primary - secondary)

}

console.log(diagonalDifference(arr, 3));