import * as React from "react";
import {Text, View,Button} from "react-native";
import {useNavigation} from "@react-navigation/native";

const Add = () => {
    const  navigation= useNavigation()
    return   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
            title="Go to Home"
            onPress={() => navigation.navigate('Home')}
        />
    </View>
}
export default Add