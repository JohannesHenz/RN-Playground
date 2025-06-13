import {View, Text, Dimensions, StyleSheet, Platform} from 'react-native'
import React from 'react'

import SimpleButton from "../components/SimpleButton";
import {useSafeAreaInsets} from "react-native-safe-area-context";

interface LandingFooterProps {
    onPress: () => void;
    label: string;
}

const LandingFooter: React.FC<LandingFooterProps> = ({onPress, label}) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.container}>
            <SimpleButton buttonStyle={[
                styles.button, { bottom: Platform.OS === 'android' ? insets.bottom + 16 : 32 }]}
                onPress={onPress}
                title={'Get Started'}>
            </SimpleButton>
        </View>
    )
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const PADDING_HORIZONTAL = 20;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: PADDING_HORIZONTAL,
        backgroundColor: 'FFF',
        height: Platform.OS === 'ios' ? 96 : 80,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(49, 71, 79, 0.3)',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 6
            },
            android: {
                elevation: 6,
                shadowColor: 'rgba(49, 71, 79, 0.8)'
            }
        })
    },
    button: {
        paddingVertical: 15,
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 32 : 16,
        width: SCREEN_WIDTH - PADDING_HORIZONTAL * 2,
        marginHorizontal: PADDING_HORIZONTAL
    }
});
export default LandingFooter
