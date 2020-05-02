import React from "react";
import { ActivityIndicator, View, Image } from "react-native";

export default function Loading() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'white'}}>
            <Image source={require( '../../assets/Sizzle_S_Logo_Transparent.png' )} style={{height: 240, width: 240, alignSelf: 'center'}} ></Image>
        </View>
    );
}
