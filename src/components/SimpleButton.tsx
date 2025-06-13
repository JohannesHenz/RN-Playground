import React from 'react';

import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity
} from 'react-native';

interface SimpleButtonProps {
    onPress: () => void;
    title: string;
    buttonStyle?: any;
    titleStyle?: StyleProp<TextStyle>;
    activeOpacity?: number;
    allowFontScaling?: boolean;
    disabled?: boolean;
}
const SimpleButton: React.FC<SimpleButtonProps> = ({
                                                       onPress,
                                                       title,
                                                       buttonStyle,
                                                       titleStyle,
                                                       activeOpacity,
                                                       allowFontScaling,
                                                       disabled
                                                   }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                onPress();
            }}
            style={[styles.button, buttonStyle]}
            activeOpacity={activeOpacity !== undefined ? activeOpacity : 0.8}
            disabled={disabled}
        >
            <Text
                allowFontScaling={allowFontScaling}
                style={[styles.title, titleStyle]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 32,
        backgroundColor: '#177FA4',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: 'rgba(53, 129, 145, 0.4)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
        minHeight: 42
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        letterSpacing: -0.3,
        fontFamily: 'SF-Pro-Text-SemiBold',
        color: '#FFF',
        textAlign: 'center'
    }
});
export default SimpleButton;
