import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity } from "react-native";
import Context from '../../context/Context'
import { signIn, signUp } from '../../firebase'

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState('signUp')
    const { 
        theme: { colors } 
    } = useContext(Context)
    const handlePress = async () => {
        if(mode == 'signUp') {
            await signUp(email, password)
        }
        else if (mode == 'signIn') {
            await signIn(email, password);
        }
    }

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
                    value={email}
                    onChangeText={setEmail}
                    style={[styles.input,{borderBottomColor: colors.primary}]} 
                />
                <TextInput 
                    placeholder="Password" 
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={[styles.input,{borderBottomColor: colors.primary, marginTop:20}]} 
                />
                <View style={{marginTop:20}}>
                    <Button 
                        title={mode == 'signUp' ? 'Sign Up' : 'Login in'} 
                        disabled={!email || !password}
                        color={colors.secondary} 
                        onPress={handlePress}
                    />
                </View>
                <TouchableOpacity
                    style={{marginTop:15}}
                    onPress={() => {
                        setMode(prevMode => prevMode == 'signUp' ? 'signIn' : 'signUp')
                    }}
                >
                    <Text style={{color: colors.secondaryText}}>
                        {mode == 'signUp' ? 'Already have an account? Login in' : 'Don\'t have an account? Sign up'} 
                    </Text>
                </TouchableOpacity>
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