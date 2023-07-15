import * as React from "react";
import {View, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Card, Text, Button} from 'react-native-paper';
import {Avatar, Paragraph} from 'react-native-paper';
import {
    Searchbar,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from "react";

const LeftContentBooking = props => <Avatar.Icon style={{backgroundColor: 'white'}} {...props} color={'#107c10'}
                                                 icon="check"/>
const LeftContentUnBooking = props => <Avatar.Icon style={{backgroundColor: 'white'}} {...props} color={'#d13438'}
                                                   icon="close"/>
const Item = ({title, subtitle, isBooking, navigation}) => (

    <Card style={{marginBottom: 24}}  onPress={()=> navigation.navigate('Detail')}>
        <Card.Title title={title} subtitle={subtitle} left={isBooking ? LeftContentBooking : LeftContentUnBooking}/>
        <Card.Content>
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 12,
                backgroundColor: '#c5cbfa',
                borderRadius: 8,
                display: 'flex'
            }}>
                <View>
                    <Text theme={{colors: {primary: '#fff'}}} variant="titleMedium">Người đặt phòng: </Text>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        style={styles.img}
                        source={{
                            uri:
                                'https://placekitten.com/200/200',
                        }}
                    />


                    <Text>Trần Nguyệt Ánh</Text>
                </View>


            </View>
        </Card.Content>
    </Card>
);

const Home = () => {
    const data = [
        {
            id: 1,
            title: 'Thư viện',
            image: 'https://picsum.photos/700',
            subtitle: '11:20 -13:45',
            cardContentTitle: 'Trần Nguyệt Ánh',
            cardContentParagraph: 'Giáo viên Viện SPKT',
            isBooking: true
        },
        {
            id: 2,
            title: 'Nhà D35',
            image: 'https://picsum.photos/700',
            subtitle: '11:20 -13:45',
            cardContentTitle: 'Trần Nguyệt Ánh',
            cardContentParagraph: 'Giáo viên Viện CNTT',
            isBooking: true
        },
        {
            id: 3,
            title: 'D9',
            image: 'https://picsum.photos/700',
            subtitle: '11:20 -13:45',
            cardContentTitle: 'Trần Nguyệt Ánh',
            isBooking: true
        },
    ];
    const navigation = useNavigation();
    const [username, setUsername] = useState('')
    const fetchApi = async () => {
        const serverUrl = 'localhost:3000/api/bookings/list'
        const res = await fetch(`http://${serverUrl}`)
        const data = await res.json()
        console.log('data', data)
    }
    React.useEffect(() => {
        checkLogin()
        fetchApi()
    }, [])
    const checkLogin = async () => {
        let username = await AsyncStorage.getItem("username");
        if (!username) {
            navigation.navigate('Login')
        } else {
            setUsername(username)
        }
    }

    return <View style={styles.root}>
        <View style={styles.header}>
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


        </View>
        <View style={styles.wrapInput}>
            <View>
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
            <View>

                <Button mode="contained" buttonColor='#5b5fc7' onPress={() => navigation.navigate('Add')}>
                    Thêm mới
                </Button>
            </View>

        </View>


        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({item}) => <Item title={item.title} subtitle={item.subtitle}
                                              cardContentParagraph={item.cardContentParagraph}
                                              cardContentTitle={item.cardContentTitle} image={item.image}
                                              isBooking={item.isBooking}
                                              navigation={navigation}
                />}
                keyExtractor={(item) => item.id}
            />
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
