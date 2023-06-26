import * as React from "react";
import {Text, View, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Card, Title, Button} from 'react-native-paper';
import { Avatar, Paragraph } from 'react-native-paper';
import {
    Searchbar,
} from 'react-native-paper';
const LeftContentBooking = props => <Avatar.Icon style={{backgroundColor:'white'}} {...props} color={'#107c10'} icon="check" />
const LeftContentUnBooking = props => <Avatar.Icon style={{backgroundColor:'white'}} {...props} color={'#d13438'} icon="close" />
const Item = ({ title,subtitle,isBooking, image, cardContentTitle, cardContentParagraph  }) => (
    <Card style={{marginBottom:24}}>
        <Card.Title title={title} subtitle={subtitle} left={isBooking ? LeftContentBooking : LeftContentUnBooking} />
        <Card.Content>
            <Title>{`Người đặt: ${cardContentTitle}`}</Title>
            <Paragraph>{`Chức vụ: ${cardContentParagraph ? cardContentParagraph : '' }`}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: image }} />
        <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
        </Card.Actions>
    </Card>
);
// const AddButton = () => {
//     return (
//         <View style={styles.addButtonContainer}>
//             <TouchableOpacity style={styles.addButton}>
//                 <Text style={styles.buttonText}>Thêm mới</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };
const Home = () => {
    const data = [
        {id: 1, title: 'Thư viện', image: 'https://picsum.photos/700', subtitle:'Lịch học đã được đặt',cardContentTitle:'Trần Nguyệt Ánh',cardContentParagraph:'Giáo viên Viện SPKT', isBooking: true },
        {id: 2, title: 'Nhà D35', image: 'https://picsum.photos/700',  subtitle:'Lịch học đã được đặt',cardContentTitle:'Trần Nguyệt Ánh', cardContentParagraph:'Giáo viên Viện CNTT', isBooking: true },
        {id: 3, title: 'D9', image: 'https://picsum.photos/700',  subtitle:'Lịch học đã được đặt',cardContentTitle:'Trần Nguyệt Ánh', isBooking: true },
        {id: 1, title: 'Thư viện', image: 'https://picsum.photos/700', subtitle:'Lịch học đã được đặt',cardContentTitle:'Trần Nguyệt Ánh', isBooking: false },
        {id: 2, title: 'Nhà D35', image: 'https://picsum.photos/700',  subtitle:'Lịch học đã được đặt',cardContentTitle:'Trần Nguyệt Ánh', isBooking: true },
        {id: 3, title: 'D9', image: 'https://picsum.photos/700',  subtitle:'Lịch học đã được đặt',cardContentTitle:'Trần Nguyệt Ánh', isBooking: false },
        {id: 1, title: 'Thư viện', image: 'https://picsum.photos/700', subtitle:'Lịch học đã được đặt',cardContentTitle:'Trần Nguyệt Ánh', isBooking: true },
        {id: 2, title: 'Nhà D35', image: 'https://picsum.photos/700',  subtitle:'Lịch học đã được đặt',cardContentTitle:'Trần Nguyệt Ánh', isBooking: false },
        {id: 3, title: 'D9', image: 'https://picsum.photos/700',  subtitle:'Lịch học đã được đặt',cardContentTitle:'Trần Nguyệt Ánh', isBooking: true },
    ];
    const navigation = useNavigation()
    return     <View style={styles.root}>
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
                    <Text style={styles.title}>Trần Nguyệt Ánh</Text>
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

        </View>


        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item title={item.title} subtitle={item.subtitle} cardContentParagraph={item.cardContentParagraph} cardContentTitle={item.cardContentTitle} image={item.image} isBooking={item.isBooking}/>}
                keyExtractor={(item) => item.id}
            />
        </View>
            <View style={styles.addButton}>
                <Text style={styles.buttonText}> Thêm mới </Text>
            </View>

    </View>
}
const styles = StyleSheet.create({
    root:{
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
        width: '100%',
        backgroundColor: '#FFFFFF',
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
    container:{
        paddingVertical:20,
        paddingHorizontal:20,
        width: '100%',
            backgroundColor: '#FFFFFF',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
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