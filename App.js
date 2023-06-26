import * as React from 'react';
import {Button, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from "./src/screen/Home";
import Login from "./src/screen/Login";
import Add from "./src/screen/CreateBooking";
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        secondary: 'yellow',
    },
};

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Home" component={Home}/>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Login" component={Login}/>

            <Stack.Screen name="Add"
                          options={{ headerShown: false }}
                          component={Add}/>


        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <MyStack/>
            </NavigationContainer>
        </PaperProvider>
    );
}
