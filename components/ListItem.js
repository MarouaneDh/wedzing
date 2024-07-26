import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import { Image, Pressable, StyleSheet, Text } from 'react-native';
import ProgressBar from 'react-native-progress/Bar'

const ListItem = ({ listName, listCategory, listId, stat }) => {
    const navigation = useNavigation()
    const [pressed, setPressed] = useState(false)
    const [colorProgress, setColorProgress] = useState("red")

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

    useEffect(() => {
        if (stat === 100) {
            setColorProgress("#089908")
        }
        if (stat < 100 && stat > 50) {
            setColorProgress("#d1651d")
        }
        if (stat < 50) {
            setColorProgress("red")
        }
    }, [stat])


    return (
        <Pressable onPress={() => setPressed(true)} style={!pressed ? styles.item : styles.itemPressed}>
            <Image style={styles.stretch} source={imageSource} />
            <Text style={styles.title}>{listName}</Text>
            <Text style={[styles.stat, { color: colorProgress }]}>{stat}%</Text>
            <ProgressBar color={colorProgress} style={styles.progress} progress={stat / 100} />
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
        textAlign: 'center',
        marginTop: 5
    },
    stat: {
        marginTop: 5,
        fontSize: 18
    },
    stretch: {
        height: 50,
        resizeMode: 'center',
    },
})

export default ListItem