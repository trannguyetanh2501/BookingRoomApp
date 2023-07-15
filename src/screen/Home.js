import * as React from "react";
import {View, StyleSheet, Image, FlatList, TouchableOpacity,} from "react-native";
import {Avatar, Dialog, Portal , Card, Text, Button} from 'react-native-paper';
import {
    Searchbar,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from "react";
import {useNavigation} from '@react-navigation/native';

const LeftContentBooking = props => <Avatar.Icon style={{backgroundColor: 'white'}} {...props} color={'#107c10'} icon="check"/>
const LeftContentUnBooking = props => <Avatar.Icon style={{backgroundColor: 'white'}} {...props} color={'#d13438'} icon="close"/>
const Item = ({title, subtitle, isBooking, navigation, id, people}) => (

    <Card style={{marginBottom: 24}} onPress={() => navigation.navigate('Detail', {
        id:id,
        name: title
    })}>
        <Card.Title title={title} subtitle={subtitle} left={isBooking ? LeftContentBooking : LeftContentUnBooking}/>
        <Card.Content>
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 12,
                display: 'flex'
            }}>

                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        style={styles.img}
                        source={{
                            uri:
                                'https://placekitten.com/200/200',
                        }}
                    />


                    <Text style={{marginLeft: 8}}>{people}</Text>
                </View>


            </View>
        </Card.Content>
    </Card>
);

const Home = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);
    const [dataProces, seDataProcess] = useState([
        {
            id: 1,
            title: 'Thư viện',
            image: 'https://picsum.photos/700',
            subtitle: '11:20 -13:45',
            people: 'Trần Nguyệt Ánh',
        },
        {
            id: 2,
            title: 'Nhà D35',
            image: 'https://picsum.photos/700',
            subtitle: '11:20 -13:45',
            people: 'Trần Nguyệt Ánh',
            isBooking: true
        },
        {
            id: 3,
            title: 'D9',
            image: 'https://picsum.photos/700',
            subtitle: '11:20 -13:45',
            people: 'Trần Nguyệt Ánh',
            isBooking: true
        },
    ])

    const getUsername = async (id) => {
        const serverUrl = 'localhost:3000/api/users/getId'
        const res = await fetch(`http://${serverUrl}/${id}`)
        const data = await res.json();
        return data.data.username
    }
    const getNameRoom = async (id) => {

        const serverUrl = 'localhost:3000/api/rooms/get'
        const res = await fetch(`http://${serverUrl}/${id}`)
        const data = await res.json();
        return data.data.name

    }
    const convertToTime = (isoString) => {
        const date = new Date(isoString);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        let sign = '+';
        if (hours < 0 || (hours === 0 && minutes < 0)) {
            sign = '-';
        }

        const absoluteHours = Math.abs(hours);
        const formattedHours = absoluteHours < 10 ? '0' + absoluteHours : absoluteHours;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

        return sign + formattedHours + ':' + formattedMinutes;
    };

    const processData = async (arr) => {
        let data = [];
        for (const index in arr) {
            const item = {
                id: arr[index]._id,
                title: await getNameRoom(arr[index].room),
                people: await getUsername(arr[index].createBy),
                image: 'https://picsum.photos/700',
                subtitle: `${convertToTime(arr[index].startTime)} - ${convertToTime(arr[index].endTime)}`,
                isBooking: true
            };
            data.push(item);
        }
        return data

    }
    const fetchApi = async () => {
        const serverUrl = 'localhost:3000/api/bookings/list'
        const res = await fetch(`http://${serverUrl}`)
        const data = await res.json();
        const _data = await processData(data.data)
        if(_data && _data.length >0){
            seDataProcess(_data);
            console.log(_data)
        }

    }
    const checkLogin = async () => {
        let username = await AsyncStorage.getItem("username");
        if (!username) {
            navigation.navigate('Login')
        } else {
            if (name) {
                setUsername(username)
            }
            setUsername(username)
        }
    }
    useEffect(() => {
        checkLogin();
        fetchApi()
    }, [])

    return <View style={styles.root}>
        <View style={styles.header} >
            <TouchableOpacity onPress={()=> setVisible(true)} style={{width:'100%', display:'flex', flexDirection:'row'}}>
                <View style={styles.item}>
                    <Image
                        style={styles.img}
                        source={{
                            uri:
                                'https://placekitten.com/200/200',
                        }}
                    />
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>{username}</Text>
                </View>

            </TouchableOpacity>



        </View>
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>{username}</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">Bạn có muốn đăng xuất không</Text>
                    <View style={{marginTop:24}}>
                        <Button mode="contained" buttonColor='#c43501' onPress={ async () => {
                            setVisible(false)
                            await AsyncStorage.removeItem('username');
                            navigation.navigate('Login')
                        }}>
                            Có
                        </Button>
                        <Button style={{marginTop:12}} mode="contained" buttonColor='#a7e3a5' onPress={() => setVisible(false)}>
                            Không
                        </Button>
                    </View>

                </Dialog.Content>
            </Dialog>
        </Portal>
        <View style={styles.wrapInput}>
            <View style={{width: '100%', flex: 1}}>
                <Searchbar
                    inputStyle={{
                        fontWeight: '400',
                        fontSize: 16,
                        lineHeight: 22,
                        color: '#6E6E6E',
                    }}
                    style={{
                        color: '#6E6E6E',
                        marginHorizontal: 12,
                        backgroundColor: '#F1F1F1',
                        borderRadius: 10,
                        height: 50,
                        fontWeight: '400',
                        fontSize: 17,
                        lineHeight: 22,
                    }}
                    placeholder="Nhập từ khóa tìm kiếm"
                />
            </View>
            <View style={{ marginRight:12}}>

                <Button mode="contained" buttonColor='#5b5fc7' onPress={() => navigation.navigate('Add')}>
                    Thêm mới
                </Button>
            </View>

        </View>


        <View style={styles.container}>

            {dataProces && <FlatList
                data={dataProces}
                renderItem={({item}) => <Item title={item.title} subtitle={item.subtitle}
                                              cardContentParagraph={item.cardContentParagraph}
                                              cardContentTitle={item.cardContentTitle} image={item.image}
                                              isBooking={item.isBooking}
                                              navigation={navigation}
                                              id={ item.id}
                                              people={item.people}
                />}
                keyExtractor={(item) => item.id}
            />}
        </View>


    </View>
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        // marginTop: StatusBar.currentHeight || 0,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
    },
    item: {},
    wrapInput: {
        display: "flex",
        width: '100%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row'
    },
    img: {
        borderRadius: 50,
        width: 32,
        height: 32,
    },
    title: {
        marginLeft: 12,
        fontSize: 26,
        lineHeight: 31,
        letterSpacing: 0.33,
        color: '#212121',
        fontWeight: 'bold',
    },
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    addButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
export default Home
