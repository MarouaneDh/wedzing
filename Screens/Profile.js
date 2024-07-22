import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ActivityIndicator, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { editOneUser, getOneUser, getPartnerUser } from '../redux/slices/user/userAsyncThunk'

import globalStyle from '../styles/styles'

const Profile = () => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.user)
    const editUser = useSelector((state) => state.user.editUser)
    const partner = useSelector((state) => state.user.partner)

    const [isEdit, setIsEdit] = useState(false)
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: ''
    })

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

    const toggleIsEdit = () => {
        setIsEdit(!isEdit)
    }

    const inputChangeHandler = (e, name) => {
        setData((initialState) => (
            {
                ...initialState,
                [name]: e
            }
        ))
    }

    const editProfileHandler = () => {
        dispatch(editOneUser(data))
    }

    useEffect(() => {
        dispatch(getOneUser())
        dispatch(getPartnerUser())
    }, [dispatch])

    useEffect(() => {
        if (editUser?.status === "fulfilled") {
            dispatch(getOneUser())
            setIsEdit(false)
        }
    }, [editUser?.status])

    return (
        isEdit ?
            <SafeAreaView style={globalStyle.container}>
                <View style={styles.container}>
                    <ScrollView>
                        {ProfilePic()}
                        <View>
                            <View style={styles.oneInput}>
                                <Text style={styles.label}>First name</Text>
                                <TextInput
                                    placeholderTextColor='#919191'
                                    placeholder="Type your first name"
                                    style={styles.input}
                                    textContentType='givenName'
                                    onChangeText={(e) => inputChangeHandler(e, 'firstName')}
                                    value={data.firstName}
                                />
                            </View>
                            <View style={styles.oneInput}>
                                <Text style={styles.label}>Last name</Text>
                                <TextInput
                                    placeholderTextColor='#919191'
                                    placeholder="Type your last name"
                                    style={styles.input}
                                    textContentType='familyName'
                                    onChangeText={(e) => inputChangeHandler(e, 'lastName')}
                                    value={data.lastName}
                                />
                            </View>
                            <View style={styles.oneInput}>
                                <Text style={styles.label}>Phone number</Text>
                                <TextInput
                                    placeholderTextColor='#919191'
                                    placeholder="Type your phone number"
                                    style={styles.input}
                                    textContentType='telephoneNumber'
                                    keyboardType='number-pad'
                                    onChangeText={(e) => inputChangeHandler(e, 'phoneNumber')}
                                    value={data.phoneNumber}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <Pressable onPress={editProfileHandler} style={styles.editButton}>
                        {
                            editUser?.isLoading ?
                                <ActivityIndicator color="white" size={40} /> :
                                <Image style={styles.editImage} source={require('../assets/edit.png')} />
                        }
                        <Text style={styles.editText}>Save changes</Text>
                    </Pressable>
                </View>
            </SafeAreaView> :
            <SafeAreaView style={globalStyle.container}>
                <View style={styles.container}>
                    <View>
                        {ProfilePic()}
                        <View>
                            <Text style={styles.text}>Name : {user?.user?.firstName} {user?.user?.lastName}</Text>
                            <Text style={styles.text}>Phone number : {user?.user?.phoneNumber}</Text>
                            <Text style={styles.text}>Email : {user?.user?.email}</Text>
                            <Text style={styles.text}>Role : {user?.user?.role}</Text>
                            <Text style={styles.text}>Partner : {partner?.partner?.firstName} {partner?.partner?.lastName}</Text>
                        </View>
                    </View>
                    <Pressable onPress={toggleIsEdit} style={styles.editButton}>
                        <Image style={styles.editImage} source={require('../assets/edit.png')} />
                        <Text style={styles.editText}>Edit profile</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
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
        borderColor: "white",
        borderWidth: 1,
    },
    editImage: {
        height: 40,
        width: 40,
        resizeMode: 'center',
    },
    editText: {
        color: 'white',
        fontSize: 25
    },
    oneInput: {
        marginTop: 5,
        marginBottom: 20,
    },
    input: {
        height: 65,
        borderWidth: 1,
        borderColor: '#c2c2c2',
        padding: 10,
        width: "100%",
        borderRadius: 10,
        marginTop: 3,
        backgroundColor: '#000',
        fontSize: 20,
        color: '#fff',
    },
    label: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 20
    },
})