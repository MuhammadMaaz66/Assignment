import { StyleSheet } from "react-native";
import Colors from "../../Theme/Colors";

const styles = StyleSheet.create({
    Container: {
        margin: 20,
    },
    ScreenTitleStyling: {
        fontSize: 20,
        marginBottom: "5%",
        fontWeight: 'bold',
        color: Colors.Black
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