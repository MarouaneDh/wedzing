import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const ListItem = ({ listName, listCategory, listId }) => {
    const navigation = useNavigation()
    const [pressed, setPressed] = useState(false)

    const assetMap = {
        kitchen: require('../assets/kitchen.png'),
        bedroom: require('../assets/bedroom.png'),
        bathroom: require('../assets/bathroom.png'),
        livingroom: require('../assets/livingroom.png'),
        toilet: require('../assets/toilet.png'),
        office: require('../assets/office.png'),
    };

    const imageSource = assetMap[listCategory] || require('../assets/default.png');

    useEffect(() => {
        if (pressed) {
            setTimeout(() => {
                setPressed(false)
                navigation.navigate('OneList', { listId })
            }, 50);
        }
    }, [pressed])

    return (
        <Pressable onPress={() => setPressed(true)} style={!pressed ? styles.item : styles.itemPressed}>
            <Image style={styles.stretch} source={imageSource} />
            <Text style={styles.title}>{listName}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 6,
        flexGrow: 1,
        flexBasis: 164,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 5
    },
    itemPressed: {
        backgroundColor: '#ab81af',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 6,
        flexGrow: 1,
        flexBasis: 164,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 5
    },
    title: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center'
    },
    stretch: {
        height: 50,
        resizeMode: 'center',
    },
})

export default ListItem