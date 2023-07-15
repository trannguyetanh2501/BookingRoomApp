import * as React from "react";
import {useEffect, useState} from "react";
import {Text, View, Button, StyleSheet, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Add = () => {

    const [listRoom, setListRoom] = useState([
        {id: 1, name: 'Thư viện Tạ Quang Bửu'},
        {id: 2, name: 'Nhà D35'},
        {id: 3, name: 'Tầng 9'},
        {id: 4, name: 'Thư viện Tạ Quang Bửu'},
        {id: 5, name: 'Thư viện Tạ Quang Bửu'},
    ])
    const [selectedValue, setSelectedValue] = useState(1);
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const currentDate = `${day}/${month}/${year}`;
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');

    const handleTextChange = (inputText) => {
        setDescription(inputText);
    };
    const createBooking = async () => {
        const serverUrl = 'localhost:3000';
        const userID = await AsyncStorage.getItem("_id");
        const requestOptions = {
            method: 'POST',
            body: new URLSearchParams({
                createBy: userID,
                room: selectedValue,
                startTime: convertToISOString(timeStart),
                endTime: convertToISOString(timeEnd),
            })
        };
        const res = await fetch(`http://${serverUrl}/api/bookings/create`, requestOptions)
        const data = await res.json()
        console.log('data', data)
    }
    const getListRoom = async () => {
        const serverUrl = 'localhost:3000'
        const res = await fetch(`http://${serverUrl}/api/rooms/list`)
        const data = await res.json()
        setListRoom(data.data)
    }
    const convertToISOString = (hours) => {
        const currentDate = new Date(); // Lấy ngày hiện tại
        const [currentYear, currentMonth, currentDay] = [
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            currentDate.getDate()
        ];

        const [hour, minute] = hours.split(':'); // Tách giờ và phút từ chuỗi

        const convertedDate = new Date(
            currentYear,
            currentMonth - 1,
            currentDay,
            parseInt(hour),
            parseInt(minute),
            0
        );

        const isoString = convertedDate.toISOString(); // Chuyển đổi thành chuỗi ISO

        // Cắt bỏ chữ "Z" ở cuối chuỗi
        const isoStringWithoutZ = isoString.slice(0, -1); // Hoặc isoString.substring(0, isoString.length - 1)

        return isoStringWithoutZ;
    };

    useEffect(() => {
        getListRoom()
    }, [])

    const navigation = useNavigation()
    return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flex: 5, width: '100%'}}>
            <View style={{width: '100%', paddingHorizontal: 20, paddingVertical: 12, height: 100}}>
                <Text style={styles.text}>Địa điểm họp</Text>
                <Picker
                    selectedValue={selectedValue}
                    style={{height: 50, width: '100%'}}
                    onValueChange={(itemValue, itemIndex) =>{ setSelectedValue(listRoom[itemIndex]._id)
                    }}
                >
                    {
                        listRoom.map((item, index) => (
                            <Picker.Item label={item.name} value={item.id} />
                        ))
                    }

                </Picker>
            </View>

            <View style={{width: '100%', paddingHorizontal: 20, paddingVertical: 12, height: 100}}>
                <Text style={styles.text}> Thời gian bắt đầu họp trong ngày {currentDate} </Text>
                <TextInput
                    value={timeStart}
                    placeholder={'Vui lòng nhập thời gian bắt đầu cuộc họp'}
                    onChangeText={(timeStart) => setTimeStart(timeStart)}
                />

            </View>
            <View style={{width: '100%', paddingHorizontal: 20, paddingVertical: 12, height: 100}}>
                <Text style={styles.text}> Thời gian kết thúc họp trong ngày {currentDate} </Text>
                <TextInput
                    value={timeEnd}
                    placeholder={'Vui lòng nhập thời gian kết thúc cuộc họp'}
                    onChangeText={(timeEnd) => setTimeEnd(timeEnd)}
                />


            </View>
            <View style={{width: '100%', paddingHorizontal: 20, paddingVertical: 12, height: 100}}>
                <Text style={styles.text}> Tóm tắt nội dung cuộc họp ( nếu có) </Text>
                <TextInput
                    style={styles.textInput}
                    multiline
                    numberOfLines={4}
                    value={description}
                    onChangeText={handleTextChange}
                    placeholder="Nhập nội dung"
                />
            </View>

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
