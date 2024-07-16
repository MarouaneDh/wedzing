import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const CustomInput = ({ name, placeholder, label, onChangeText }) => {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor='#919191'
                placeholder={placeholder}
                onChangeText={(text)=>onChangeText(text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        color: '#fff',
        fontWeight: '600'
    },
    input: {
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
})

export default CustomInput