import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace } from '../../utils/TextTruncate';

const CategoryHeader = ({ category }) => {
    return (
        <Text style={ styles.categoryHeaderText }>{ category }</Text>
    );
};

export default CategoryHeader;