import { StyleSheet } from "react-native";
import Colors from "../../Theme/Colors";

const styles = StyleSheet.create({
    ScreenHeaderStyling: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: Colors.Black
    },
    CustomButtonStyling: {
        marginTop: '2%',
    },
    CustomTextStyling: {
        fontSize: 18
    },
    ButtonsSectionStyling:{
        marginHorizontal: '5%',
        marginTop: '5%'
    }
});
export default styles;