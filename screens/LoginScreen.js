import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView } from 'react-native';



export default function LoginScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>LoginScreen Screen</Text>
            <Button title="Go to Bookings page" onPress={() => navigation.navigate('BookingPage')} />
            <Button title="Go to Category" onPress={() => navigation.navigate('CategoryPage')} />
        </View>
    );
}