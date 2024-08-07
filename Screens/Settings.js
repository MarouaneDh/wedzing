import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { TriangleColorPicker, toHsv } from 'react-native-color-picker';

const Settings = ({ route }) => {
    const [color, setColor] = useState('#000');
    const [colorV, setColorV] = useState(0);

    const onColorChange = (newColor) => {
        const hexColor = hsvToHex(newColor.h / 360, newColor.s, newColor.v);
        setColorV(newColor.v)
        setColor(hexColor);
    };


    const hsvToHex = (h, s, v) => {
        // Convert HSV to RGB
        let r, g, b;
        let i = Math.floor(h * 6);
        let f = h * 6 - i;
        let p = v * (1 - s);
        let q = v * (1 - f * s);
        let t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
        }

        // Convert RGB to HEX
        const toHex = (x) => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    return (
        <View style={{ flex: 1, padding: 45, backgroundColor: color }}>
            <Pressable style={styles.chooseColor}>
                <Text style={{ color: 'black', textAlign: 'center', fontSize: 18, fontWeight: '500' }}>
                    Choose this color
                </Text>
            </Pressable>

            <TriangleColorPicker
                color={color}
                onColorChange={onColorChange}
                onColorSelected={(color) => alert(`Color selected: ${color}`)}
                onOldColorSelected={() => alert(`Old color selected: ${color}`)}
                style={{ flex: 1 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    chooseColor: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        elevation: 10,
        width: 220,
        alignSelf: 'center',
    }
})

export default Settings