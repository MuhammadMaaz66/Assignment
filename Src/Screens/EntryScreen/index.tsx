import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { postTrip } from '../../Utils/API';
import styles from './style';
import CustomInput from '../../Components/CustomTextInput';
import ReuseButton from '../../Components/ReuseButton';
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface EntryFormData {
    entryDateTime: string;
    numberPlate: string;
    entryInterchange: string;
}

const EntryScreen: React.FC = () => {
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [formData, setFormData] = useState<EntryFormData>({
        entryDateTime: '',
        numberPlate: '',
        entryInterchange: '',
    });

    const handleChange = (name: keyof EntryFormData, value: string) => {
        setFormData({ ...formData, [name]: value });
    };
    const handleDateConfirm = (date: Date) => {
        setFormData({ ...formData, entryDateTime: date.toISOString() }); // Save ISO string for backend compatibility
        setPickerVisible(false); // Hide modal after date selection
    };

    const handleSubmit = async () => {
        const data = {
            EntryDateTime: formData.entryDateTime,
            NumberPlate: formData.numberPlate,
            EntryInterchange: formData.entryInterchange,
            TripStatus: 'Active',
        };

        try {
            await postTrip(data);
            Alert.alert('Success', 'Entry recorded successfully!');
            setFormData({ entryDateTime: '', numberPlate: '', entryInterchange: '' });
        } catch (error) {
            Alert.alert('Error', 'Failed to record entry');
        }
    };

    return (
        <View style={styles.Container}>
            <Text style={styles.ScreenTitleStyling}>Record Entry</Text>
            <Text style={styles.LabelStyling}>Entry Date & Time</Text>
            <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setPickerVisible(true)}
            >
                <Text style={styles.dateText}>
                    {formData.entryDateTime
                        ? new Date(formData.entryDateTime).toLocaleString()
                        : new Date().toLocaleString()
                    }
                </Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isPickerVisible}
                mode="datetime"
                date={formData.entryDateTime ? new Date(formData.entryDateTime) : new Date()}
                is24Hour={true}
                onConfirm={handleDateConfirm}
                    onCancel={() => setPickerVisible(false)} // Hide modal on cancel
                />
            <CustomInput
                label="Number Plate"
                placeholder="Number Plate"
                value={formData.numberPlate}
                onChangeText={(text) => handleChange('numberPlate', text)}
            />
            <CustomInput
                label="Entry Interchange"
                placeholder="Entry Interchange"
                value={formData.entryInterchange}
                onChangeText={(text) => handleChange('entryInterchange', text)}
            />
            <ReuseButton
                ButtonTitle="Record Entry"
                onPress={handleSubmit}
                CustomStyle={{marginTop: '2%'}}
                CustomTextStyle={{ fontSize: 18 }}
            />
        </View>
    );
};



export default EntryScreen;
