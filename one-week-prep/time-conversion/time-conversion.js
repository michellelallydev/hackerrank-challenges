let s = '12:00:01AM'

function timeConversion(s) {
    let arr = s.split(":")

    if(arr[2].slice(2,4) == "PM"){
        if(arr[0] !== "12"){
            arr[0] = String(parseInt(arr[0]) + 12)
        }
    }
    else{
        if(arr[0] == "12"){
            arr[0] = "00"
        }
    }
    arr[2] = arr[2].split("").splice(0,2).join("")

    return arr.join(":")
}


console.log(timeConversion(s))