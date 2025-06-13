import {View, Text, Platform, Dimensions, StyleSheet} from 'react-native'
import React from 'react'
import Thumbnail from "./Thumbnail";
import SimpleButton from "../components/SimpleButton";
import {useSafeAreaInsets} from "react-native-safe-area-context";

interface LandingHeroProps {
    onPress: () => void;
    label: string;
}

const LandingHero: React.FC<LandingHeroProps> = ({onPress, label}) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.container}>
            <Thumbnail />
            <SimpleButton buttonStyle={[
                styles.button, { bottom: insets.bottom + 80 }]}
                          onPress={onPress}
                          title={'Start Swiping'}>
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        paddingVertical: 15,
        position: 'absolute',
        width: SCREEN_WIDTH - PADDING_HORIZONTAL * 2,
        marginHorizontal: PADDING_HORIZONTAL
    }
});
export default LandingHero
