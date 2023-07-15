import * as React from "react";
import {View, StyleSheet, Image, Text} from "react-native";
import {TextInput, Button, ActivityIndicator} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";
import {useState} from 'react'

const Login = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [useremail, setUseremail] = useState('');
    const [password, setPassword] = useState('');
    const [mssv, setMssv] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const handleLogin = () => {
        setLoading(true)
        setTimeout(async () => {
            await AddUser()
        }, 1000)

    };
    const AddUser = async () => {

        const serverUrl = 'localhost:3000'
        const requestOptions = {
            method: 'POST',
            body: new URLSearchParams({
                username: username,
                password: password,
                useremail: useremail,
                mssv: mssv,
            })
        };
        await fetch(`http://${serverUrl}/api/users/create`, requestOptions).then(async (res) => {
                const statusCode = res.status;
                const data = res.json();
                return Promise.all([statusCode, data]);
            }
        ).then(async res => {
            if (res[0] === 200) {

                if ((res[1].success)== false) {
                    setMessage(res[1].notice)
                    setLoading(false)
                } else {
                    setLoading(false)
                    setMessage(res[1].notice)
                    setTimeout(() => {
                        navigation.navigate('Login')
                    }, 500)
                }
            }
        })
            .catch(async (e) => {
                console.log(e)
            })

    }

    return <View style={styles.container}>

        <Image
            source={{uri: 'https://www.appsflyer.com/wp-content/themes/AF2020/assets/images/placeholders/signup/img-thanks.svg'}}
            style={{width: 200, height: 200, resizeMode: 'contain', marginBottom: 24}}
        />
        {loading && <ActivityIndicator animating={true} color={'#aab1fa'} style={{marginBottom: 24}}/>
        }
        <TextInput
            label="Nhập Email"
            style={styles.input}
            placeholder="VD: anh.tn2025@gmail.com"
            onChangeText={useremail => setUseremail(useremail)}
            value={useremail}
            focusable={true}
        />
        <TextInput
            label="Nhập mssv"
            style={styles.input}
            placeholder="20202024"
            onChangeText={mssv => setMssv(mssv)}
            value={mssv}
            focusable={true}
        />
        <TextInput
            label="Nhập Username"
            style={styles.input}
            placeholder="VD: anh.tn"
            onChangeText={text => setUsername(text)}
            value={username}
            focusable={true}
        />
        <TextInput
            style={styles.input}
            label="Nhập Password"
            placeholder="Lưu ý mật khẩu này là duy nhất và bạn không nên chia sẻ nó cho bất cứ ai.."
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
            right={<TextInput.Icon icon="eye"/>}
        />
        <Text> {message}</Text>
        <Button mode="contained" style={{backgroundColor: '#2886de', marginTop: 12, marginBottom:24}} onPress={handleLogin}>
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
