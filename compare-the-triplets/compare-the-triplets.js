const a = [5, 6, 7]
const b = [3, 6, 10]

function compareTriplets(a, b) {
    let aliceScore = 0, bobScore = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] > b[i]) {
            aliceScore++;
        } else if (a[i] < b[i]) {
            bobScore++;
        }
    }
    return [aliceScore, bobScore]
}

console.log(compareTriplets(a, b))