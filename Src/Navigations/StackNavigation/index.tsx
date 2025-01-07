import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../Screens/HomeScreen';
import EntryScreen from '../../Screens/EntryScreen';
import ExitScreen from '../../Screens/ExitScreen';

export type RootStackParamList = {
    HomeScreen: undefined;
    EntryScreen: undefined;
    ExitScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="HomeScreen"
                screenOptions={{
                    headerShown: false, // Don't show headers by default
                }}
            >
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="EntryScreen" component={EntryScreen} />
                <Stack.Screen name="ExitScreen" component={ExitScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigation;
