import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import globalStyle from '../styles/styles'
import { getOneUser } from '../redux/slices/user/userAsyncThunk'

const Profile = () => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.user)

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
        dispatch(getOneUser())
    }, [dispatch])

    return (
        <SafeAreaView style={globalStyle.container}>
            <View style={styles.container}>
                <View>
                    {ProfilePic()}
                    <View>
                        <Text style={styles.text}>Name : {user?.user.firstName} {user?.user.lastName}</Text>
                        <Text style={styles.text}>Phone number : {user?.user.phoneNumber}</Text>
                        <Text style={styles.text}>Email : {user?.user.email}</Text>
                        <Text style={styles.text}>Role : {user?.user.role}</Text>
                        <Text style={styles.text}>Partner : {user?.user.partner}</Text>
                    </View>
                </View>
                <View style={styles.editButton}>
                    <Image style={styles.editImage} source={require('../assets/edit.png')} />
                    <Text style={styles.editText}>Edit profile</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        paddingVertical: 25
    },
    headerImages: {
        height: 100,
        width: 100,
        resizeMode: 'center',
        marginBottom: 45,
        alignSelf: 'center'
    },
    text: {
        fontSize: 20,
        color: 'white',
        marginBottom: 10
    },
    editButton: {
        backgroundColor: '#000000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 6,
        padding: 10,
        width: 220,
        borderColor: "white",
        borderWidth: 1
    },
    editImage: {
        height: 40,
        width: 40,
        resizeMode: 'center',
    },
    editText: {
        color: 'white',
        fontSize: 25
    }
})