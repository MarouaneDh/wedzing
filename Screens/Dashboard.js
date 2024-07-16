import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {
    SafeAreaView,
    View,
    StyleSheet,
    ScrollView,
    Text,
    Pressable,
    Image,
} from 'react-native';

import RefreshWrapper from '../helpers/RefreshWrapper';
import ListItem from '../components/ListItem';
import { logout } from '../redux/slices/auth/authSlice';
import { getAllLists } from '../redux/slices/list/listAsyncThunk';
import { getOneUser } from '../redux/slices/user/userAsyncThunk';

import globalStyle from '../styles/styles';

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const lists = useSelector((state) => state.lists.lists)
    const user = useSelector((state) => state.user.user)

    const toAddNewList = () => {
        navigation.navigate('AddNewList')
    }

    const toProfile = () => {
        navigation.navigate('Profile')
    }

    const logoutUser = () => {
        dispatch(logout())
    }

    const ProfilePic = () => {
        if (user?.user?.role === "husband") {
            return (
                <Image style={styles.headerImages} source={require('../assets/profile-man.png')} />
            )
        }
        if (user?.user?.role === "wife") {
            return (
                <Image style={styles.headerImages} source={require('../assets/profile-woman.png')} />
            )
        }
    }

    useEffect(() => {
        dispatch(getAllLists())
        dispatch(getOneUser())
    }, [dispatch])

    return (
        <RefreshWrapper onRefresh={() => dispatch(getAllLists())}>
            <SafeAreaView style={globalStyle.container}>
                <View style={styles.header}>
                    <Pressable onPress={() => toProfile()}>
                        {ProfilePic()}
                    </Pressable>
                    <Text style={styles.screenTitle}>Your Lists</Text>
                    <Pressable onPress={() => logoutUser()}>
                        <Image style={styles.headerImages} source={require('../assets/logout.png')} />
                    </Pressable>
                </View>
                <ScrollView>
                    <View style={styles.list}>
                        <Pressable onPress={() => toAddNewList()} style={styles.item}>
                            <Image style={styles.stretch} source={require('../assets/add.png')} />
                            <Text style={styles.add}>Add new list</Text>
                        </Pressable>
                        {
                            lists?.lists?.map((item) => {
                                return (
                                    <ListItem listId={item._id} listName={item.listName} listCategory={item.listCategory} key={item._id} />
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </RefreshWrapper>
    );
};

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 15
    },
    headerImages: {
        height: 40,
        width: 40,
        resizeMode: 'center',
    },
    screenTitle: {
        color: 'white',
        fontSize: 30,
        fontWeight: '400'
    },
    list: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: 50
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 6,
        flexGrow: 1,
        flexBasis: 164,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    stretch: {
        height: 50,
        resizeMode: 'center',
    },
    title: {
        fontSize: 18,
        color: 'white'
    },
    add: {
        fontSize: 18,
        color: 'black'
    },
})

export default Dashboard