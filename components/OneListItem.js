import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import ImageViewing from 'react-native-image-viewing';

const OneListItem = ({ listItem }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const stats = listItem.numberOfItemsBought / listItem.numberOfItems;

    const images = listItem?.imageURLs?.map((pic) => {
        return { uri: pic };
    });

    return (
        <View>
            <Pressable style={styles.item} onPress={() => setIsModalVisible(true)}>
                <Image style={styles.stretch} source={!listItem?.imageURLs[0] ? require('../assets/default-image.png') : { uri: listItem?.imageURLs[0] }} />
                <Text>
                    {listItem.item} bought <Text style={stats === 0 ? styles.statTextZero : stats === 1 ? styles.statTextfull : styles.statTextPending}>{listItem.numberOfItemsBought}/{listItem.numberOfItems}</Text>
                </Text>
            </Pressable>

            <ImageViewing
                images={images}
                imageIndex={0}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#ebebeb',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 25
    },
    title: {
        fontSize: 18,
        color: 'black'
    },
    stretch: {
        height: 50,
        width: 50,
        marginRight: 20
    },
    statTextZero: {
        color: 'red',
        fontWeight: 'bold'
    },
    statTextfull: {
        color: 'green',
        fontWeight: 'bold'
    },
    statTextPending: {
        color: 'orange',
        fontWeight: 'bold'
    }
});

export default OneListItem;
