import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../Theme/Colors';
import Icon from '../../Theme/Icons';

interface CustomHeaderProps {
    title: string;
    onBackPress: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, onBackPress }) => {
    return (
        <View style={styles.Container}>
            <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                <Icon type='FontAwesome5' name="chevron-left" size={20} color={Colors.Black} />
            </TouchableOpacity>
            <Text style={styles.HeaderTitleStyling}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: "4%",
        backgroundColor: Colors.White, // Customize your header background color
        borderBottomWidth: 1,
        borderBottomColor: Colors.DotOpacity,
        marginBottom: '5%'
    },
    backButton: {
        marginRight: "3%",
    },
    HeaderTitleStyling: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.Black,
    },
});

export default CustomHeader;
