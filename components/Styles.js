import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    defaultView: {
        flex: 1,
        padding: 20
    },
    landing: {
        flex: 1,
        backgroundColor: "white",
    },
    smalltext: {
        fontFamily: 'sans-serif-light',
        fontSize: 10,
    },
    categoryHeaderText: {
        fontSize: 25,
        paddingLeft: 20,
        paddingTop: 6,
        paddingBottom: 2,
    },
    headerStyle: {
        backgroundColor: '#FF9900',
        paddingTop: 40,
        paddingBottom: 10
    },
    businessSquareOuter: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
        backgroundColor: '#f2f2f2'
    },
    businessSquareInner: {
        flex: 6,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    }
});

const input = StyleSheet.create({
    formInput: {
        height: 40,
        borderColor: "#c0c0c0",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20
    }
});

const COLORS = {
    white: 'white',
    black: 'black',
    green: 'green',
    orange: 'orange',
    red: 'red',
    blue: 'blue'
};

export { styles, input, COLORS };