import * as React from "react";
import { View, StyleSheet, Image, Dimensions, Alert } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react'
const width = Dimensions.get('screen').width;


const Login = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        Alert.alert(`Xin chào ${username}`);
        AddUser()
        // Xử lý logic đăng nhập ở đây, ví dụ: gọi API, kiểm tra thông tin đăng nhập, ...
        navigation.navigate('Home')
    };
    const AddUser = async () => {
        const serverUrl = 'localhost:3000'
        const params = new URLSearchParams({
            username: username, passs: password
        });
        const res = await fetch(`http://${serverUrl}/api/add?` + params)
        const data = await res.json()
        console.log('data', data)
    }

    return <View style={styles.container}>

        <Image source={{ uri: 'https://static.mass.spsvn.com/images/app/sign-in.png' }}
            style={{ width: 200, height: 200, resizeMode: 'contain', marginBottom: 24 }}
        />
        <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={text => setUsername(text)}
            value={username}
        />
        <TextInput
            style={styles.input}
            label="Password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
            right={<TextInput.Icon icon="eye" />}
        />
        <Button mode="contained" style={{ backgroundColor: '#107c10' }} onPress={handleLogin}>
            Login
        </Button>
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        width: '100%',
        marginBottom: 24,
        paddingHorizontal: '20%',
        borderRadius: 8
    },
});
export default Login