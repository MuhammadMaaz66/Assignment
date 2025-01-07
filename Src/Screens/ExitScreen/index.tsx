import React, { useEffect, useState } from 'react';
import { View, Alert, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { calculateToll } from '../../Utils/TollCalculator';
import { getTrips, updateTrip } from '../../Utils/API';
import CustomInput from '../../Components/CustomTextInput';
import styles from './style';
import ReuseButton from '../../Components/ReuseButton';
import CustomStyles from '../../Theme/CustomStyle/style';
import CustomHeader from '../../Components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface ExitFormData {
    numberplate: string;
    exitDateTime: string;
    exitInterchange: string;
}

const ExitScreen: React.FC = () => {
    const navigation = useNavigation();
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [exitData, setExitData] = useState<ExitFormData>({
        numberplate: '',
        exitDateTime: '',
        exitInterchange: '',
    });
    const [tripId, setTripId] = useState<string | null>(null);
    const [totalCost, setTotalCost] = useState<number | null>(null);

    const handleChange = (name: keyof ExitFormData, value: string) => {
        setExitData({ ...exitData, [name]: value });
    };

    const fetchTripId = async () => {
        try {
            console.log("line 185:: ", await getTrips())
            const trips = await getTrips();
            const trip = trips.find((t) => t.numberplate === exitData.numberplate);

            if (trip) {
                setTripId(trip._id);
            } else {
                ToastAndroid.show('Error: No trip found for this number plate.', ToastAndroid.LONG);
                setTripId(null);
            }
        } catch (error) {
            ToastAndroid.show('Error: Failed to fetch trips. Please try again.', ToastAndroid.LONG);
            // Alert.alert('Error', '');
        }
    };

    const handleCalculate = async () => {
        if (!tripId) {
            ToastAndroid.show('Error: Please enter a valid number plate to fetch the trip.', ToastAndroid.LONG);
            return;
        }

        try {
            const trips = await getTrips();
            const trip = trips.find((t) => t._id === tripId);

            if (!trip) {
                ToastAndroid.show('Error: Trip not found.', ToastAndroid.LONG);
                return;
            }

            const cost = calculateToll(trip, exitData.exitDateTime, exitData.exitInterchange);
            setTotalCost(cost);

            await updateTrip(tripId, {
                ...trip,
                ExitDateTime: exitData.exitDateTime,
                ExitInterchange: exitData.exitInterchange,
                TotalCostTrip: cost,
                TripStatus: 'Completed',
            });

            Alert.alert('Success', 'Exit recorded successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to calculate toll. Please try again.');
        }
    };

    useEffect(() => {
        if (exitData.numberplate) {
            console.log("line 235::", exitData?.numberplate)
            fetchTripId();
        }
    }, [exitData.numberplate]);

    const handleDateConfirm = (date: Date) => {
        setExitData({ ...exitData, exitDateTime: date.toISOString() });
        setPickerVisible(false);
    };

    return (
        <View style={CustomStyles.Container}>
            <CustomHeader title="Exit Screen" onBackPress={() => navigation.goBack()} />

            <View style={styles.FormSectionStyling}>
                <CustomInput
                    label="Number Plate"
                    placeholder="Enter Number Plate"
                    value={exitData.numberplate}
                    onChangeText={(text) => handleChange('numberplate', text)}
                />
                <Text style={styles.LabelStyling}>Exit Date & Time</Text>
                <TouchableOpacity
                    style={styles.datePickerButton}
                    onPress={() => setPickerVisible(true)}
                >
                    <Text style={styles.dateText}>
                        {exitData.exitDateTime
                            ? new Date(exitData.exitDateTime).toLocaleString()
                            : new Date().toLocaleString()}
                    </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isPickerVisible}
                    mode="datetime"
                    date={exitData.exitDateTime ? new Date(exitData.exitDateTime) : new Date()}
                    is24Hour={true}
                    onConfirm={handleDateConfirm}
                    onCancel={() => setPickerVisible(false)}
                />
                <CustomInput
                    label="Exit Interchange"
                    placeholder="Enter Exit Interchange"
                    value={exitData.exitInterchange}
                    onChangeText={(text) => handleChange('exitInterchange', text)}
                />
                <ReuseButton
                    ButtonTitle="Calculate Toll"
                    onPress={handleCalculate}
                    CustomStyle={{ marginTop: '2%' }}
                    CustomTextStyle={{ fontSize: 18 }}
                />
                {totalCost !== null && <Text>Total Cost: {totalCost.toFixed(2)} PKR</Text>}
            </View>
        </View>
    );
};

export default ExitScreen;
