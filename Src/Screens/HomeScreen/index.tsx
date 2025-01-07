import React from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import styles from './style';
import CustomStyles from '../../Theme/CustomStyle/style';
import ReuseButton from '../../Components/ReuseButton';
import { useNavigation } from '@react-navigation/native';
import EntryScreen from '../EntryScreen';


const HomeScreen: React.FC = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={CustomStyles.Container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.ScreenHeaderStyling}>Toll Management System</Text>
                <EntryScreen />
                <View style={styles.ButtonsSectionStyling}>
                    <ReuseButton
                        ButtonTitle="Calculate Toll"
                        onPress={() => navigation.navigate("ExitScreen" as never)}
                        CustomStyle={styles.CustomButtonStyling}
                        CustomTextStyle={styles.CustomTextStyling}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
