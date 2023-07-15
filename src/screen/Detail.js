import * as React from 'react';
import {Text, Chip, DataTable, List} from 'react-native-paper';
import {StyleSheet, View, Image, FlatList} from "react-native";

const Detail: React.FC = () => {
    const [expanded, setExpanded] = React.useState(true);
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    const [items] = React.useState([
        {
            key: 1,
            name: 'Điều hòa',
            calories: 4,
            fat: 'Sử dụng tốt',
        },
        {
            key: 2,
            name: 'Quạt trần',
            calories: 6,
            fat: 'Đã xuống cấp',

        },
        {
            key: 3,
            name: 'Máy chiếu',
            calories: 2,
            fat: 'Sử dụng tốt',

        },
        {
            key: 4,
            name: 'Bảng đen',
            calories: 4,
            fat: 'Sử dụng tốt',

        },
        {
            key: 5,
            name: 'Ghế',
            calories: 50,
            fat: 'Sử dụng tốt',

        },
        {
            key: 6,
            name: 'Phấn bảng',
            calories: 5,
            fat: 'Sử dụng tốt',

        },
    ]);

    const handleAccordionToggle = () => {
        setExpanded(!expanded);
    };
    return <View style={styles.container}>
        <View>
            <Text variant="displaySmall">Quyết định thành lập trường SPKT</Text>
            <View style={{marginTop: 8}}>
                <Text variant="labelMedium">Người đặt phòng: </Text>

            </View>
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
            <List.Section title="Thông tin chung">
                <List.Accordion
                    expanded={expanded}
                    onPress={handleAccordionToggle}
                    titleStyle={{color: '#5b5fc7'}}
                    title="Thời gian đặt phòng"
                    left={() => <List.Icon color={'#5b5fc7'} style={{marginLeft: 8}} icon="calendar"/>}>
                    <List.Item title="Thời gian họp: 14:00" />
                    <List.Item title="Thời gian kết thúc: 15:00" />
                </List.Accordion>
                <List.Accordion
                    titleStyle={{color: '#5b5fc7'}}
                    title="Cơ sở vật chất"
                    left={() => <List.Icon color={'#5b5fc7'} style={{marginLeft: 8}} icon="equal"/>}>
                    <View>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Tên </DataTable.Title>
                                <DataTable.Title> Số lượng</DataTable.Title>
                                <DataTable.Title> Tình trạng</DataTable.Title>
                            </DataTable.Header>

                            {items.map((item) => (
                                <DataTable.Row key={item.key}>
                                    <DataTable.Cell>{item.name}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
                                </DataTable.Row>
                            ))}

                            <DataTable.Pagination
                                page={page}
                                numberOfPages={Math.ceil(items.length / itemsPerPage)}
                                onPageChange={(page) => setPage(page)}
                            />
                        </DataTable>
                    </View>

                </List.Accordion>

            </List.Section>
            <View style={{flex: 1}}>
                <View>
                    <Image
                        style={{width: '100%', height: 200}}
                        source={require('../assets/image/image1.jpg')}
                    />
                    <Image
                        style={{width: '100%', height: 200, marginTop: 8}}
                        source={require('../assets/image/image2.jpg')}
                    />
                    <Image
                        style={{width: '100%', height: 200, marginTop: 8}}
                        source={require('../assets/image/image3.jpg')}
                    />
                </View>
            </View>


        </View>


    </View>
}
const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    img: {
        borderRadius: 50,
        width: 32,
        height: 32,
        marginRight: 8
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
    },
});
export default Detail
