import {View, Text, StyleSheet, Image} from 'react-native'
import React, {useCallback} from 'react'

import Header from '../view/Header'
import LandingFooter from "./LandingFooter";
import LandingHeader from "./LandingHeader";
import LandingHero from "./LandingHero";
import {useNavigation} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import { StackNavigationProp } from '@react-navigation/stack';
import {RootStackParamList} from "../../navigation/RootStackParamList";


export default function LandingScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const onPressFooter = useCallback(()=>{
        navigation.navigate('DestinationScreen');
    }, [navigation]);
    const onPressHero = useCallback(()=>{
        navigation.navigate('SwiperScreen');
    }, [navigation]);

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            <LandingHeader />
            <LandingHero onPress={onPressHero} label={'Start Swiping'} />
            <LandingFooter onPress={onPressFooter} label={'Get Started'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

})
