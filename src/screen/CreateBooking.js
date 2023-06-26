import * as React from "react";
import {useState} from "react";
import {Text, View, Button, StyleSheet, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

const Add = () => {
    const dataRoom = [
        {id: 1, name: 'Thư viện Tạ Quang Bửu'},
        {id: 2, name: 'Nhà D35'},
        {id: 3, name: 'Tầng 9'},
        {id: 4, name: 'Thư viện Tạ Quang Bửu'},
        {id: 5, name: 'Thư viện Tạ Quang Bửu'},
    ]
    const [selectedValue, setSelectedValue] = useState(1);
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const currentDate = `${day}/${month}/${year}`;
    const [text, setText] = useState('');

    const handleTextChange = (inputText) => {
        setText(inputText);
    };


    const navigation = useNavigation()
    return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{ flex:5, width:'100%'}}>
            <View style={{width: '100%', paddingHorizontal: 20, paddingVertical: 12, height: 100}}>
                <Text style={styles.text}>Chủ đề cuộc họp</Text>
                <TextInput
                    placeholder={'Vui lòng nhập chủ đề cho phòng họp mà bạn muốn đặt'}
                    forceTextInputFocus={true}
                />
            </View>
            <View style={{width: '100%', paddingHorizontal: 20, paddingVertical: 12, height: 100}}>
                <Text style={styles.text}>Địa điểm họp</Text>
                <Picker
                    selectedValue={selectedValue}
                    style={{height: 50, width: '100%'}}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    {
                        dataRoom.map((item, index) => (
                            <Picker.Item label={item.name} value={item.id}/>
                        ))
                    }

                </Picker>
            </View>
            <View style={{width: '100%', paddingHorizontal: 20, paddingVertical: 12, height: 100}}>
                <Text style={styles.text}> Thời gian họp trong ngày {currentDate} </Text>
                <TextInput
                    placeholder={'Vui lòng nhập thời gian họp mong muốn'}
                    forceTextInputFocus={true}
                />
            </View>
            <View style={{width: '100%', paddingHorizontal: 20, paddingVertical: 12, height: 100}}>
                <Text style={styles.text}> Tóm tắt nội dung cuộc họp </Text>
                <TextInput
                    style={styles.textInput}
                    multiline
                    numberOfLines={4}
                    value={text}
                    onChangeText={handleTextChange}
                    placeholder="Nhập nội dung"
                />
            </View>

        </View>

        <View style={styles.add}>
            <TouchableOpacity style={styles.button} onPress={()=>{ navigation.navigate('Home')}}>
                <Text style={styles.buttonText}>Thêm mới</Text>
            </TouchableOpacity>
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
    add:{
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
