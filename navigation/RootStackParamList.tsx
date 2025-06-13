import {ParamListBase} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";


export interface RootStackParamList extends ParamListBase {
    HomeSwiper: undefined;
    LandingScreen: undefined;
    DestinationScreen: undefined;
}

export type RootStackNavigationProps =
    NativeStackNavigationProp<RootStackParamList>;