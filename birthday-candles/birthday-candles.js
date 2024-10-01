let candles = [4,4,1,3]
function birthdayCakeCandles(candles) {
    let sum = 0;
    let maxNum = Math.max(...candles);

    for (let i = 0; i < candles.length; i++) {
        if (candles[i] == maxNum) {
            sum++;
        }

    }
    
    return sum;
}

console.log(birthdayCakeCandles(candles))