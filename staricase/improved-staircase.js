// O(n^2)
function staircase(n) {
    let staircase = '';
    for (let i = 1; i <= n; i++) {
        staircase = staircase.padStart(i, ' ') + '#'
        console.log(staircase)
    }       
    
}

console.log(staircase(4))