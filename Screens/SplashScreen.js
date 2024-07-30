import React, { useEffect, useRef } from 'react'

import { Animated, StyleSheet, View } from 'react-native'

const SplashScreen = () => {
    const fadeAnimImg = useRef(new Animated.Value(0)).current;
    const fadeAnimImgScale = useRef(new Animated.Value(1)).current;

    const fadeAnimTextOpacity = useRef(new Animated.Value(0)).current;
    const fadeAnimTextY = useRef(new Animated.Value(50)).current;

    const fadeAnimTextTwoOpacity = useRef(new Animated.Value(0)).current;
    const fadeAnimTextTwoY = useRef(new Animated.Value(50)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnimImg, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnimImgScale, {
            toValue: 0.25,
            delay: 1500,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(fadeAnimTextOpacity, {
            toValue: 1,
            delay: 2500,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnimTextY, {
            toValue: 0,
            delay: 2500,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(fadeAnimTextTwoOpacity, {
            toValue: 1,
            delay: 3500,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnimTextTwoY, {
            toValue: 0,
            delay: 3500,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnimImg, {
            toValue: 0,
            duration: 2500,
            useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnimTextOpacity, {
            toValue: 0,
            duration: 2500,
            useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnimTextTwoOpacity, {
            toValue: 0,
            duration: 2500,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        fadeIn()

        setTimeout(() => {
            fadeOut()
        }, 6000);
    }, [])


    return (
        <View style={styles.splashContainer}>
            <Animated.Image style={[styles.splashImg, {
                opacity: fadeAnimImg,
                transform: [{ scale: fadeAnimImgScale }]
            }]}
                source={require('../assets/favIcon.jpg')}
            />
            <Animated.Text style={[styles.appName, {
                opacity: fadeAnimTextOpacity,
                transform: [{ translateY: fadeAnimTextY }]
            }]}>WEDz</Animated.Text>
            <Animated.Text style={[styles.text, {
                opacity: fadeAnimTextTwoOpacity,
                transform: [{ translateY: fadeAnimTextTwoY }]
            }]}>Buy everything you need before you get married...</Animated.Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    splashContainer: {
        backgroundColor: "black",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    splashImg: {
        width: 800,
        height: 800,
        borderRadius: 50,
    },
    appName: {
        position: 'absolute',
        color: "white",
        alignSelf: 'center',
        bottom: 180,
        fontStyle: 'italic',
        fontSize: 50,
        fontWeight: '700'
    },
    text: {
        position: 'absolute',
        color: "white",
        alignSelf: 'center',
        bottom: 120,
        fontSize: 20,
        textAlign: 'center',
        fontStyle: 'italic'
    }
})