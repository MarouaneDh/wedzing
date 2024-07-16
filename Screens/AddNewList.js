import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { ActivityIndicator, Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native"

import { Dropdown } from 'react-native-element-dropdown';

import CustomInput from "../components/CustomInput"
import { getAsyncStorageData } from "../helpers/storage";
import { addNewList, getAllLists } from "../redux/slices/list/listAsyncThunk";
import { resetOneListData } from "../redux/slices/list/listSlice";

const AddNewList = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const addingList = useSelector((state) => state.lists.oneList)

    const [listCategory, setListCategory] = useState(null);
    const [listName, setListName] = useState(null);

    const data = [
        { label: 'Kitchen', value: 'kitchen' },
        { label: 'Bathroom', value: 'bathroom' },
        { label: 'Living Room', value: 'livingroom' },
        { label: 'Bedroom', value: 'bedroom' },
        { label: 'Toilet', value: 'toilet' },
        { label: 'Office', value: 'office' },
    ];

    const oneItem = (item) => {
        const assetMap = {
            kitchen: require('../assets/kitchen.png'),
            bedroom: require('../assets/bedroom.png'),
            bathroom: require('../assets/bathroom.png'),
            livingroom: require('../assets/livingroom.png'),
            toilet: require('../assets/toilet.png'),
            office: require('../assets/office.png'),
        };

        const imageSource = assetMap[item.value] || require('../assets/default.png');

        return (
            <View style={styles.oneItem}>
                <Image style={styles.stretch} source={imageSource} />
                <Text>{item.label}</Text>
            </View>
        )
    }

    const addListPressHandler = async () => {
        const userID = await getAsyncStorageData("userID");
        const partnerID = await getAsyncStorageData("userPartner");

        const newListData = {
            listCategory: listCategory,
            listName: listName,
            list: [],
            couple: [
                userID,
                partnerID
            ]
        }

        dispatch(addNewList(newListData))
    }

    useEffect(() => {
        if (addingList.status === 'fulfilled') {
            dispatch(getAllLists())
            navigation.navigate('Dashboard')
        }
    }, [addingList])

    useEffect(() => () => dispatch(resetOneListData()), []);

    return (
        <SafeAreaView style={styles.container}>
            <CustomInput
                name="listName"
                label="List Name"
                placeholder="Type the name of your list"
                onChangeText={setListName}
            />
            <Text style={styles.label}>Select a category</Text>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                placeholder="Select a category"
                data={data}
                maxHeight={250}
                labelField="label"
                valueField="value"
                value={listCategory}
                onChange={item => {
                    setListCategory(item.value);
                }}
                renderItem={oneItem}
            />
            <Pressable style={styles.button} onPress={addListPressHandler}>
                {addingList.isLoading && <ActivityIndicator color="#fff" size={20} />}
                <Text style={styles.buttonText}>Add list</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
        backgroundColor: 'black',
        paddingHorizontal: 20,
    },
    dropdown: {
        height: 50,
        borderWidth: 1,
        borderColor: '#c2c2c2',
        padding: 10,
        width: "100%",
        borderRadius: 10,
        marginTop: 3,
        backgroundColor: '#00000075',
        fontSize: 14,
        color: '#fff',
    },
    stretch: {
        height: 50,
        width: 50,
        marginRight: 15
    },
    oneItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    label: {
        color: '#fff',
        fontWeight: '600',
        marginTop: 30,
    },
    placeholderStyle: {
        fontSize: 16,
        color: "#919191"
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "#fff"
    },
    button: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 10,
        width: '90%',
        marginTop: 20,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
        marginLeft: 10
    },
})

export default AddNewList