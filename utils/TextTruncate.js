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