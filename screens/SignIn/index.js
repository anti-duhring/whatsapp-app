import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import Context from '../../context/Context'

const SignIn = () => {
    const { 
        theme: { colors } 
    } = useContext(Context)
    return ( 
        <View style={[styles.container, { backgroundColor: colors.white }]}>
            <Text style={[styles.text, { color: colors.foreground}]}>Welcome to Whatsapp</Text>
            <Image 
                source={require('../../assets/welcome-img.png')} 
                style={styles.welcomeImg} 
                resizeMode='cover' 
            />
            <View style={{marginTop:20}}>
                <TextInput 
                    placeholder="Email" 
                    style={[styles.input,{borderBottomColor: colors.primary}]} 
                />
                <TextInput 
                    placeholder="Password" 
                    secureTextEntry
                    style={[styles.input,{borderBottomColor: colors.primary, marginTop:20}]} 
                />
            </View>
        </View>
     );
}
 
export default SignIn;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems:'center',
        flex:1,
    },
    text: {
        fontSize: 24,
        marginBottom: 20
    },
    welcomeImg: {
        width: 180,
        height: 180,
    },
    input: {
        borderBottomWidth: 2,
        width: 200,
    }
})