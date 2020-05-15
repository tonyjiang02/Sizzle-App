import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    defaultView: {
        flex: 1,
    },
    landing: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    categoryHeaderText: {
        fontSize: 25,
        paddingLeft: 20,
        paddingTop: 6,
        paddingBottom: 2,
    },
    openPictureStyle: {
        height: 125,
        width: 235,
    },
    closedPictureStyle: {
        height: 125,
        width: 235,
        opacity: 0.3
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
        backgroundColor: 'transparent',
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
    infoOuterBlock: {
        paddingBottom: 15,
        backgroundColor: 'azure',
    },
    infoInnerBlock: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        alignItems: 'center'
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
    sortModalView: {
        marginHorizontal: 10,
        marginTop: 150,
        marginBottom: 150,
        backgroundColor: "white",
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
    introModalView: {
        marginHorizontal: 10,
        marginBottom: 150,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingBottom: 35,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    reservationsModalView: {
        marginHorizontal: 10,
        marginTop: 150,
        marginBottom: 150,
        backgroundColor: "#E1FDE2",
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
    searchModalView: {
        marginBottom: 250,
        backgroundColor: "transparent",
    },
    mapStyle: {
        width: '100%',
        height: 200,
    },
    mapOuterStyle: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        alignItems: 'center'
    }
});

const input = StyleSheet.create({
    formInput: {
        height: 50,
        backgroundColor: '#f2f2f2',
        borderColor: "#f2f2f2",
        borderWidth: 0.5,
        paddingLeft: 10,
        width: 300,
        borderRadius: 12, 
        marginBottom: 20,
        color: 'black',
        alignSelf: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
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