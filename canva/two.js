let dates = ['20th Oct 2052', '1st Mar 1974'];

function preprocessDate() {

    let convertedDates = [];
    
    const months = {Jan:'01',  Feb:'02', Mar:'03', Apr:'04', May:'05', Jun:'06', Jul:'07', Aug:'08', Sep:'09', Oct:'10', Nov:'11', Dec:'12'}
    
    for (let i = 0; i < dates.length; i++){
        
        let tempDate = [];
        let [day, month, year] = dates[i].split(" ");
     
        if(day.length == 4) {
            day = day.substring(0, day.length - 2);
        } else {
            day = '0' + day.substring(0, day.length - 2); 
        }

        month = months[month];

        tempDate.push(year);
        tempDate.push('-');
        
        tempDate.push(month)
        tempDate.push('-');

        tempDate.push(day);

        tempDate = tempDate.join('');

        convertedDates.push(tempDate);
    }

    return convertedDates;
}

preprocessDate(dates)