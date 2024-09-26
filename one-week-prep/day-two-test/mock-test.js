let matrix = [[1,2],[3,4]]

function flippingMatrix(matrix) {
    let n = matrix.length/2;
    let max = 0;
    let total = 0; 

    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            total += Math.max(matrix[i][j],
                            matrix[i][2 * n - 1 - j],
                            matrix[2 * n - 1 - i][j],
                            matrix[2 * n - 1 - i][2 * n - 1 - j]);
    
        }
    }
    
    return total;

}

console.log(flippingMatrix(matrix));