import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    defaultView: {
        flex: 1,
        padding: 20
    },
    landing: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});

const input = StyleSheet.create({
    formInput: {
        height: 40,
        borderColor: "#c0c0c0",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20
    },
    searchInput: {

    }
});

export { styles, input };