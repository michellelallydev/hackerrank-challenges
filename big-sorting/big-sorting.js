let unsorted = [31415926535897932384626433832795, 1, 3, 10, 3, 5]

function bigSorting(unsorted) {
    return unsorted.sort((a, b) => {
        if (a.length === b.length) {
            return a > b ? 1 : -1;
        }
        return a.length - b.length;
    })
}


console.log(bigSorting(unsorted));
