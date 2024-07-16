import React, { useEffect, useState } from 'react'
import { useToast } from 'react-native-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { login } from '../redux/slices/auth/authAsyncThunk';

import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { storeData } from '../helpers/storage';

import globalStyle from '../styles/styles';

const Login = () => {
    const toast = useToast();
    const navigation = useNavigation()
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth.auth);

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const allFullFields = loginData.email !== '' &&
        loginData.password !== ''

    const allEmptyFields = loginData.email === '' &&
        loginData.password === ''

    const toRegister = () => {
        navigation.navigate('Register')
    }

    const inputChangeHandler = (e, name) => {
        setLoginData((initialState) => (
            {
                ...initialState,
                [name]: e
            }
        ))
    }

    const showToast = (type, message) => {
        toast.show(message, {
            type: type,
            placement: "bottom",
            duration: 3000,
            offset: 30,
            animationType: "slide-in",
        });
    }

    const loginPressHandler = () => {
        if (allFullFields) {
            dispatch(login({ email: loginData.email, password: loginData.password }))
        }
        if (allEmptyFields) {
            showToast('warning', "Please type your creadantials")
        }
    }

    useEffect(() => {
        if (auth?.data?.token) {
            showToast('success', auth?.data?.msg)
            storeData("token", auth.data.token)
            storeData("userID", auth.data.user._id)
            storeData("userPartner", auth.data.user.partner)
        }
        if (auth?.error) {
            showToast('danger', auth?.error?.errors[0]?.msg)
        }
    }, [auth])

    return (
        <View style={globalStyle.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputContainer}>
                <View style={styles.oneInput}>
                    <TextInput
                        placeholderTextColor='#919191'
                        placeholder="Type your email"
                        style={styles.input}
                        textContentType='emailAddress'
                        onChangeText={(e) => inputChangeHandler(e, 'email')}
                        value={loginData.email}
                    />
                </View>
                <View style={styles.oneInput}>
                    <TextInput
                        placeholderTextColor='#919191'
                        placeholder="Type your password"
                        style={styles.input}
                        textContentType='password'
                        secureTextEntry
                        onChangeText={(e) => inputChangeHandler(e, 'password')}
                        value={loginData.password}
                    />
                </View>
                <Pressable style={styles.button} onPress={loginPressHandler}>
                    {auth.isLoading && <ActivityIndicator color="#fff" size={20} />}
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            </View>
            <Text style={globalStyle.text}>You don't have an account? <Text onPress={() => toRegister()} style={globalStyle.link}>register here</Text></Text>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    loginContainer: {
        backgroundColor: '#000',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 40,
        textTransform: 'uppercase'
    },
    inputContainer: {
        width: "100%",
        paddingLeft: 30
    },
    oneInput: {
        marginTop: 5,
        marginBottom: 20,
        zIndex: 0
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#c2c2c2',
        padding: 10,
        width: "90%",
        borderRadius: 10,
        marginTop: 3,
        backgroundColor: '#000',
        fontSize: 14,
        color: '#fff',
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
});