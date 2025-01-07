import { StyleSheet } from "react-native";
import Colors from "../../Theme/Colors";

const styles = StyleSheet.create({
    ScreenTitleStyling: {
        fontSize: 20,
        marginVertical: "5%",
        marginHorizontal: '5%',
        fontWeight: 'bold',
    },
    FormSectionStyling: {
        marginHorizontal: "5%"
    },
    LabelStyling: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: '2%',
        color: Colors.Black,
    },
    datePickerButton: {
        padding: "3%",
        backgroundColor: Colors.White,
        borderRadius: 5,
        marginBottom: "5%",
        borderWidth: 1,
        borderColor: '#ccc'
    },
    dateText: {
        fontSize: 16,
        color: '#555',
    },
});
export default styles;
