let arr = [1,1,0,-1,-1]

function plusMinus(arr) {
    let pos = 0, neg = 0, zero = 0;

    for(let i = 0; i < arr.length; i++){
        if (arr[i] > 0) {
            pos++; 
        } else if (arr[i] < 0) {
            neg++;
        } else {
            zero++;
        }
    }
    console.log((pos / arr.length).toFixed(6));
    console.log((neg / arr.length).toFixed(6));
    console.log((zero / arr.length).toFixed(6));
}

plusMinus(arr)