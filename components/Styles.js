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
        color: 'white'
    },
    openPictureStyle: {
        height: 125,
        width: 235,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
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
        borderRadius: 10,
        backgroundColor: 'transparent',
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
        borderRadius: 10,
    },
    businessCardOuter: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'transparent',
        borderRadius: 10,
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
        borderRadius: 10,
    },
    infoOuterBlock: {
        paddingBottom: 15,
        backgroundColor: 'azure',
        borderRadius: 5
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
        alignItems: 'center',
        borderRadius: 5
    },
    liveUpdatesModalView: {
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
    pickupModalView: {
        marginTop: 150,
        marginBottom: 150,
        backgroundColor: "lavender",
        borderRadius: 20,
        paddingHorizontal: 15,
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
    covid19ModalView: {
        marginTop: 150,
        marginBottom: 150,
        backgroundColor: "#FDE6E6",
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
        marginTop: 150,
        marginBottom: 150,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    reservationsModalView: {
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
        overflow: 'hidden'
    },
    mapOuterStyle: {
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden'
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
        borderRadius: 5, 
        marginBottom: 15,
        color: 'black',
        alignSelf: 'center',
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