import * as React from "react";
import {Text, View, StyleSheet, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Card, Title, Button} from 'react-native-paper';

const Home = () => {
    const data = [
        {id: 1, title: 'Thư viện', image: 'https://picsum.photos/700'},
        {id: 2, title: 'Nhà D35', image: 'https://picsum.photos/700'},
        {id: 3, title: 'D9', image: 'https://picsum.photos/700'},
    ];
    const navigation = useNavigation()
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
                <Text style={styles.title}>Trần Nguyệt Ánh</Text>
            </View>
        </View>
        <View style={styles.container}>
            {data.map(item => (
                <Card key={item.id} style={{marginBottom:24}}>
                    <Card.Cover source={{uri: item.image}}/>
                    <Card.Content>
                        <Title>{item.title}</Title>
                    </Card.Content>
                    <Card.Actions>
                        <Button>Đặt lịch</Button>
                    </Card.Actions>
                </Card>
            ))}
        </View>

    </View>
}
const styles = StyleSheet.create({
    root:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#FFFFFF',
        },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
    },
    item: {},
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
        marginTop: 24,
        width: '100%',
        backgroundColor: '#FFFFFF',
    },
});
export default Home