import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

interface DestinationScreenProps {

}
const DestinationScreen: React.FC<DestinationScreenProps> = () => {
    return (
        <View style={styles.container}>
            <Text>DestinationScreen</Text>
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

export default DestinationScreen;