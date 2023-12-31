import * as React from "react";
import { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Add = () => {
    const navigation = useNavigation();

    const [listRoom, setListRoom] = useState([
        { id: 1, name: 'Thư viện Tạ Quang Bửu' },
        { id: 2, name: 'Nhà D35' },
        { id: 3, name: 'Tầng 9' },
        { id: 4, name: 'Thư viện Tạ Quang Bửu' },
        { id: 5, name: 'Thư viện Tạ Quang Bửu' },
    ])
    const [selectedValue, setSelectedValue] = useState(1);
    const [selected, setSelected] = useState(1);

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const currentDate = `${day}/${month}/${year}`;
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)

    const handleTextChange = (inputText) => {
        setDescription(inputText);
    };
    const createBooking = async () => {
        setLoading(true)


        const serverUrl = 'localhost:3000';
        const userID = await AsyncStorage.getItem("_id");
        const requestOptions = {
            method: 'POST',
            body: new URLSearchParams({
                createBy: userID,
                room: selected,
                startTime: convertToISOString(timeStart),
                endTime: convertToISOString(timeEnd),
            })
        };
        const res = await fetch(`http://${serverUrl}/api/bookings/create/`, requestOptions)
        const data = await res.json()
        console.log('data', data)
        setTimeout(async () => {
            console.log('data', data.success)
            if (data.success == 'false') {
                setLoading(false)
                setMessage(data.notice);

            } else {
                setLoading(false)
                setMessage(data.notice);
                navigation.navigate('Home')
            }
        }, 500)


    }
    const getListRoom = async () => {
        const serverUrl = 'localhost:3000'
        const res = await fetch(`http://${serverUrl}/api/rooms/list`)
        const data = await res.json()
        setListRoom(data.data)
    }
    const convertToISOString = (timeString) => {
        const [hour, minute] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hour, 10));
        date.setMinutes(parseInt(minute, 10));
        // return date.toISOString();
        var tzo = -date.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function (num) {
                return (num < 10 ? '0' : '') + num;
            };

        const retDate = date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + "00" +
            "Z"

        return retDate
    };

    useEffect(() => {
        getListRoom()
    }, [])

    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 5, width: '100%' }}>
            {loading && <ActivityIndicator animating={true} color={'#aab1fa'} style={{ marginBottom: 24 }} />
            }
            <Text> {message}</Text>
            <View style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 12, height: 100 }}>
                <Text style={styles.text}>Địa điểm họp</Text>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedValue(itemValue)
                        setSelected(listRoom[itemIndex]._id)
                    }}
                >
                    {
                        listRoom.map((item, index) => (
                            <Picker.Item label={item.name} value={item.id} />
                        ))
                    }

                </Picker>
            </View>

            <View style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 12, height: 100 }}>
                <Text style={styles.text}> Thời gian bắt đầu họp trong ngày {currentDate} </Text>
                <TextInput
                    value={timeStart}
                    placeholder={'Vui lòng nhập thời gian bắt đầu cuộc họp'}
                    onChangeText={(timeStart) => setTimeStart(timeStart)}
                />

            </View>
            <View style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 12, height: 100 }}>
                <Text style={styles.text}> Thời gian kết thúc họp trong ngày {currentDate} </Text>
                <TextInput
                    value={timeEnd}
                    placeholder={'Vui lòng nhập thời gian kết thúc cuộc họp'}
                    onChangeText={(timeEnd) => setTimeEnd(timeEnd)}
                />


            </View>
            {/*<View style={{width: '100%', paddingHorizontal: 20, paddingVertical: 12, height: 100}}>*/}
            {/*    <Text style={styles.text}> Tóm tắt nội dung cuộc họp ( nếu có) </Text>*/}
            {/*    <TextInput*/}
            {/*        style={styles.textInput}*/}
            {/*        multiline*/}
            {/*        numberOfLines={4}*/}
            {/*        value={description}*/}
            {/*        onChangeText={handleTextChange}*/}
            {/*        placeholder="Nhập nội dung"*/}
            {/*    />*/}
            {/*</View>*/}

            <View style={styles.add}>
                <TouchableOpacity style={styles.button} onPress={createBooking}>
                    <Text style={styles.buttonText}>Thêm mới</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    text: {
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 20,
        color: '#212121',
    },
    button: {
        backgroundColor: '#107c10',
        width: '100%',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    add: {
        paddingHorizontal: 20,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
});
export default Add
