n = 161
function countingBits(n) {
    let bin = n.toString(2);
    let pos = [];
    let count = bin.split('1').length - 1;
    let result = [];

    console.log(bin);
    
    for (let i = 0; i < bin.length; i++) {
        if (bin[i] === '1') {
            pos.push(bin.length - i);
        }
    }

    result.push(count)
    result.push(pos.reverse())
    return result;
}


console.log(countingBits(n))