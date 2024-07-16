import { useEffect, useState } from 'react';
import { useToast } from "react-native-toast-notifications";

import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import globalStyle from '../styles/styles';

const Register = ({ route }) => {
    const toast = useToast();
    const navigation = useNavigation()
    const { param1, param2 } = route.params || {};
    const [registerationData, setRegisterationData] = useState({
        role: 'husband',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        partner: ''
    })
    const [confirmPass, setConfirmPass] = useState('')
    const [passCheck, setPassCheck] = useState(false)

    const inputChangeHandler = (e, name) => {
        setRegisterationData((initialState) => (
            {
                ...initialState,
                [name]: e
            }
        ))
    }

    const toLogin = () => {
        navigation.navigate('Login')
    }

    const showToast = (type, message) => {
        toast.show(message, {
            type: type,
            placement: "bottom",
            duration: 3000,
            // offset: 30,
            // animationType: "slide-in",
        });
    }

    const checkPassHandler = () => {
        setPassCheck(confirmPass === registerationData.password)
    }

    const allFullFields = registerationData.email !== '' &&
        registerationData.firstName !== '' &&
        registerationData.lastName !== '' &&
        registerationData.password !== '' &&
        registerationData.role !== ''

    const registerPressHandler = () => {
        if (confirmPass !== '' && !passCheck) {
            showToast('danger', 'Passwords do not match')
        }
        if (allFullFields) {
            if (confirmPass !== '' && passCheck) {
                showToast('success', 'Registrared successfully')
            }
        }
    }

    useEffect(() => {
        checkPassHandler()
    }, [confirmPass, registerationData.password])

    return (
        <View style={globalStyle.container}>
            <Text style={styles.title}>Register</Text>
            <ScrollView style={styles.inputContainer}>
                <View style={styles.oneInput}>
                    <Text style={styles.text}>First name</Text>
                    <TextInput
                        placeholderTextColor='#919191'
                        placeholder="Type your first name"
                        style={styles.input}
                        textContentType='givenName'
                        onChangeText={(e) => inputChangeHandler(e, 'firstName')}
                        value={registerationData.firstName}
                    />
                </View>
                <View style={styles.oneInput}>
                    <Text style={styles.text}>Last name</Text>
                    <TextInput
                        placeholderTextColor='#919191'
                        placeholder="Type your last name"
                        style={styles.input}
                        textContentType='familyName'
                        onChangeText={(e) => inputChangeHandler(e, 'lastName')}
                        value={registerationData.lastName}
                    />
                </View>
                <View style={styles.oneInput}>
                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        placeholderTextColor='#919191'
                        placeholder="Type your email"
                        style={styles.input}
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        onChangeText={(e) => inputChangeHandler(e, 'email')}
                        value={registerationData.email}
                    />
                </View>
                <View style={styles.oneInput}>
                    <Text style={styles.text}>Password</Text>
                    <TextInput
                        placeholderTextColor='#919191'
                        placeholder="Type your password"
                        style={styles.input}
                        textContentType='password'
                        secureTextEntry
                        onChangeText={(e) => inputChangeHandler(e, 'password')}
                        value={registerationData.password}
                    />
                </View>
                <View style={styles.oneInput}>
                    <Text style={styles.text}>Confirm your password</Text>
                    <TextInput
                        placeholderTextColor='#919191'
                        placeholder="Type your password again"
                        style={styles.input}
                        textContentType='password'
                        secureTextEntry
                        onChangeText={setConfirmPass}
                    />
                </View>
                <View style={styles.oneInput}>
                    <Text style={styles.text}>Phone number</Text>
                    <TextInput
                        placeholderTextColor='#919191'
                        placeholder="Type your phone number"
                        style={styles.input}
                        textContentType='telephoneNumber'
                        keyboardType='number-pad'
                        onChangeText={(e) => inputChangeHandler(e, 'phoneNumber')}
                        value={registerationData.phoneNumber}
                    />
                </View>
                <Pressable style={styles.button} onPress={registerPressHandler}>
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>
            </ScrollView>
            <Text style={globalStyle.text}>You already have an account? <Text onPress={() => toLogin()} style={globalStyle.link}>login here</Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 25,
        alignSelf: 'center',
        marginBottom: 5,
        marginTop: 5,
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
    text: {
        color: '#fff',
        fontWeight: '600'
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
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: '800'
    },
    link: {
        color: "#54cdfd"
    }
});

export default Register