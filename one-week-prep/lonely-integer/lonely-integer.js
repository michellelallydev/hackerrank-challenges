let a = [1,2,3,4,3,2,1]

function lonelyInteger(a) {
    
    return a.filter((num)=> a.indexOf(num) === a.lastIndexOf(num));

}

console.log(lonelyInteger(a))