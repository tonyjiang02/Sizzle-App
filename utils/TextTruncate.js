export function textTruncateBySpace(num, text) {
    var finalStr = '';
    let charArr = text.split('');
    let split = 0;
    for (let i = num; i > 0; i--) {
        if (charArr[i] === ' ') {
            split = i;
            break;
        }
    }
    if (split == 0) {
        finalStr = charArr.slice(0, num).join("") + "...";
    } else {
        finalStr = charArr.slice(0, split).join("") + "...";
    }
    return finalStr;
};
export function textTruncate(num, text) {
    let charArr = text.split('');
    return charArr.slice(0, num).join("") + "...";
}

export function textTruncateBySpaceTwo(num, text) {
    var finalStr= '';
    for (let i = 0; i < num-3; i++){
        finalStr = finalStr + text.substring(i, i+1);
    }
    finalStr = finalStr + '...';
    return finalStr;
}

export function timeToString(date) {
    let monthStr = "";
    let minuteStr = "";
    let ampm = "am";
    let hourStr = "";

    //month parser
    monthStr = (date.getMonth()+1).toString();

    //minute parser
    if (date.getMinutes() < 10){
        minuteStr = "0"+date.getMinutes().toString();
    }
    else{
        minuteStr = date.getMinutes().toSTring();
    }

    //hour parser
    if (date.getHours() >= 12){
        ampm = "pm";
        if (date.getHours() > 12){
            hourStr = (date.getHours()-12).toString();
        }
        else {
            hourStr = (date.getHours()).toString();
        }
    }
    else{
        ampm = 'am';
        if (date.getHours() === 0){
            hourStr = '12';
        }
        else{
            hourStr = (date.getHours()).toString();
        }
    }
    return monthStr.toString() + '/' + date.getDate().toString() + '/' + date.getFullYear().toString() + ' - ' + hourStr + ":" + minuteStr + ampm;
}