import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    defaultView: {
        flex: 1,
    },
    landing: {
        flex: 1,
        backgroundColor: "white",
    },
    categoryHeaderText: {
        fontSize: 25,
        paddingLeft: 20,
        paddingTop: 6,
        paddingBottom: 2,
    },
    headerStyle: {
        
    },
    businessSquareOuter: {
        flex: 1,
        paddingRight: 15,
        paddingBottom: 10,
        backgroundColor: '#f2f2f2',
    },
    businessSquareInner: {
        flex: 6,
        backgroundColor: 'white',
        padding: 0, 

        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    businessCardOuter: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'white',
    },
    businessCardInner: {
        flexDirection: 'row',
        paddingRight: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    liveUpdatesModalView: {
        marginHorizontal: 10,
        marginTop: 150,
        marginBottom: 150,
        backgroundColor: "#fdeedc",
        borderRadius: 20,
        paddingHorizontal: 35,
        paddingBottom: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    infoBlock: {
        flexDirection: 'row', 
        flex: 1, 
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingVertical: 3,
    },  
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