import { Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const FONTSIZE18 = 14000 / height;
const FONTSIZE20 = 16000 / height;

export function getFontSize(size) {
    return ((size)*300000)/(height*width);
}

export function getIconSize(size) {
    return ((size-15)*1000)/(height*0.2);
}