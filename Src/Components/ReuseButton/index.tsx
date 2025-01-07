import { StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle, } from 'react-native'
import React, { ReactNode } from 'react'
import Colors from '../../Theme/Colors'

interface ReuseButtonProps extends TouchableOpacityProps {
    ButtonTitle?: string; // Optional button title
    CustomStyle?: ViewStyle; // Optional custom styles for the button
    CustomTextStyle?: TextStyle; // Optional custom styles for the text
    onPress?: () => void; // Optional press handler
    Type_Text?: boolean; // Determines if the text should be rendered
    addLeft?: ReactNode; // Optional left component
    addRight?: ReactNode; // Optional right component
}

const ReuseButton: React.FC<ReuseButtonProps> = ({
    ButtonTitle = '',
    CustomStyle,
    CustomTextStyle,
    onPress,
    Type_Text = true,
    addLeft,
    addRight,
    ...props
}) => {
    return (
        <TouchableOpacity
            style={[styles.BtnStyle, CustomStyle]}
            onPress={onPress}
            {...props}
        >
            {addLeft}
            {Type_Text && (
                <Text style={[styles.BtnText, CustomTextStyle]}>{ButtonTitle}</Text>
            )}
            {addRight}
        </TouchableOpacity>
    );
};

export default ReuseButton;

const styles = StyleSheet.create({
    BtnStyle: {
        width: "100%",
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
        backgroundColor: Colors.Primary,
        flexDirection: 'row',
    },
    BtnText: {
        color: Colors.White,
        fontSize: 16,
    },
})