import React from 'react'
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SwiperScreen from './src/SwiperScreen'
import LandingScreen from './src/Landing/LandingScreen'
import DestinationScreen from "./src/userData/DestinationScreen";
import { RootStackParamList} from "./navigation/RootStackParamList";


const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name={"LandingScreen"} component={LandingScreen} />
                <Stack.Screen name={"SwiperScreen"} component={SwiperScreen} />
                <Stack.Screen name={"DestinationScreen"} component={DestinationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

