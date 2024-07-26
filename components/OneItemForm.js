import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

const OneItemForm = ({ item, takePicture, index, itemIndex, deleteItemHandler, setNewList }) => {
    const image = useSelector((state) => state.images.images)

    const [oneItems, setOneItems] = useState(item)
    const [itemNameError, setItemNameError] = useState(false)
    const [numberToBuyError, setNumberToBuyError] = useState(false)

    const deleteImageHandler = (urlIndex) => {
        let imgs = item?.imageURLs.filter((_, i) => i !== urlIndex);
        setNewList((prevState) => {
            const updatedList = prevState.map((item, prevIndex) => {
                if (prevIndex === index) {
                    return {
                        ...item,
                        imageURLs: imgs
                    };
                }
                return item;
            });
            return updatedList;
        });
    };


    const handleChange = (name, e) => {
        setOneItems((prevState) => {
            if (name === 'numberOfItems' || name === 'numberOfItemsBought') {
                return {
                    ...prevState,
                    [name]: +e
                }
            } else {
                return {
                    ...prevState,
                    [name]: e
                }
            }
        })
    }

    useEffect(() => {
        if (image.status === 'fulfilled') {
            setNewList((prevState) => {
                return prevState.map((item, i) => {
                    if (i === itemIndex) {
                        if (!item.imageURLs.includes(image.image)) {
                            return {
                                ...item,
                                imageURLs: [...item.imageURLs, image.image]
                            }
                        }
                    }
                    return item
                });
            });
        }
    }, [image.status]);

    useEffect(() => {
        setNewList((prevState) => {
            return prevState.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        item: oneItems.item,
                        isBought: (+oneItems.numberOfItems === +oneItems.numberOfItemsBought) && +oneItems.numberOfItems !== 0,
                        numberOfItems: oneItems.numberOfItems,
                        numberOfItemsBought: oneItems.numberOfItemsBought
                    }
                } else {
                    return item
                }
            }
            );
        })
    }, [oneItems])

    useEffect(() => {
        if (oneItems.item !== "") {
            setItemNameError(true)
        } else {
            setItemNameError(false)
        }

        if (oneItems.numberOfItems !== 0) {
            setNumberToBuyError(true)
        } else {
            setNumberToBuyError(false)
        }
    }, [oneItems])


    return (
        <View style={styles.itemContainer}>
            <Pressable onPress={() => deleteItemHandler(index)} style={styles.newItemHeader}>
                <Image style={styles.stretchItemDelete} source={require('../assets/delete.png')} />
            </Pressable>

            <Text style={styles.label}>Item name</Text>
            {!itemNameError && <Text style={styles.errorMessage}>"Item name" field is required</Text>}
            <TextInput placeholder='Type the name of the item' onChangeText={(e) => handleChange("item", e)} value={oneItems?.item} style={itemNameError ? styles.input : styles.errorInput} />
            <Text style={styles.label}>Number of items to buy</Text>
            {!numberToBuyError && <Text style={styles.errorMessage}>"Number of items to buy" field is required</Text>}
            <TextInput keyboardType='number-pad' onChangeText={(e) => handleChange("numberOfItems", e)} value={oneItems?.numberOfItems ? `${oneItems?.numberOfItems}` : '0'} style={numberToBuyError ? styles.input : styles.errorInput} />
            <Text style={styles.label}>Number of items bought</Text>
            <TextInput keyboardType='number-pad' onChangeText={(e) => handleChange("numberOfItemsBought", e)} value={oneItems?.numberOfItemsBought ? `${oneItems?.numberOfItemsBought}` : '0'} style={styles.input} />
            <View style={styles.images}>
                <View style={styles.itemImages}>
                    {
                        item?.imageURLs?.map((img, index) => {
                            return (
                                <View key={index}>
                                    <Image style={styles.stretch} source={{ uri: img }} />
                                    <Pressable onPress={() => deleteImageHandler(index)} style={styles.deletePicContainer}>
                                        <Image style={styles.stretchDelete} source={require('../assets/delete.png')} />
                                    </Pressable>
                                </View>
                            )
                        })
                    }
                    <Pressable onPress={() => takePicture(index)}>
                        <Image style={styles.stretchCamera} source={require('../assets/camera.png')} />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default OneItemForm

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: 20,
        marginLeft: 15,
        borderBottomWidth: 0.5,
        marginRight: 35,
        paddingBottom: 15,
        borderColor: "#000000",
        marginBottom: 20
    },
    newItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        position: 'absolute',
        right: 0,
        top: -15
    },
    stretchItemDelete: {
        height: 30,
        width: 30,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#818181',
        padding: 10,
        width: "100%",
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: '#c2c2c258',
        fontSize: 14,
        color: '#000',
    },
    errorInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ff0000',
        padding: 10,
        width: "100%",
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: '#c2c2c258',
        fontSize: 14,
        color: '#000',
    },
    label: {
        color: '#000',
        fontSize: 15
    },
    errorMessage: {
        color: 'red',
        fontSize: 10
    },
    numberInputsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        marginTop: 10,
    },
    itemImages: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    stretch: {
        height: 65,
        width: 65,
        marginRight: 20,
        borderWidth: 1,
        borderColor: '#000',
        marginTop: 10,
        borderRadius: 5
    },
    stretchCamera: {
        height: 71,
        width: 71,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 5
    },
    stretchDelete: {
        height: 15,
        width: 15,
    },
    deletePicContainer: {
        backgroundColor: '#ebebeb',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#000',
        width: 22,
        height: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        top: 2
    },
})