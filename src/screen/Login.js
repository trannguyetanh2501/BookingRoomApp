import * as React from "react";
import {View, StyleSheet, Image,Text } from "react-native";
import {TextInput, Button, ActivityIndicator} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";
import {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const handleLogin = () => {
        setLoading(true)
        setTimeout(async () => {
            await Login()
        }, 1000)
    };
    const handleSignUp = () => {
        navigation.navigate('SignUp')
    }
    const Login = async () => {

        const serverUrl = 'localhost:3000'
   await fetch(`http://${serverUrl}/api/users/get/`+ email).then(async (res) => {
                const statusCode = res.status;
                const data = res.json();
                return Promise.all([statusCode, data]);
            }
        ).then(async res => {
            if (res[0] === 200) {
                console.log('res[1]',res[1])
                console.log('type', typeof (res[1]))
                if (res[1].success == false) {
                    setMessage(res[1].error)
                    setLoading(false)
                    console.log('chạy đây1')
                } else {
                    setLoading(false)
                    setMessage('Đăng nhập thành công');
                    console.log('res[1].error', res[1].user);
                    await AsyncStorage.setItem("username", (res[1]).user.username);
                    await AsyncStorage.setItem("_id", (res[1]).user._id);
                    navigation.navigate('Home')
                }
            }
        })
            .catch(async (e) => {
                console.log(e)
            })

    }

    return <View style={styles.container}>

        <Image source={{uri: 'https://static.mass.spsvn.com/images/app/sign-in.png'}}
               style={{width: 200, height: 200, resizeMode: 'contain', marginBottom: 24}}
        />
        {loading && <ActivityIndicator animating={true} color={'#aab1fa'} style={{marginBottom: 24}}/>
        }
        <TextInput
            style={styles.input}
            label={'Email'}
            placeholder="Email"
            onChangeText={email => setEmail(email)}
            value={email}
        />
        <TextInput
            style={styles.input}
            label="Password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
            right={<TextInput.Icon icon="eye"/>}
        />
        <Text> {message}</Text>

        <Button mode="contained" style={{backgroundColor: '#107c10'}} onPress={handleLogin}>
            Login
        </Button>
        <Button mode="contained" style={{backgroundColor: '#2886de', marginTop: 12, marginBottom:24}} onPress={handleSignUp}>
            Sign up
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
