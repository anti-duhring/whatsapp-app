import React, { useContext, useEffect, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, Image, TextInput, Button } from "react-native";
import Context from "../../context/Context";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {pickImage, askForPermission} from '../../lib/utils'

const Profile = () => {
    const {theme: {colors}} = useContext(Context);
    const [displayName, setDisplayName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [permissionStatus, setPermissionStatus] = useState(null)

    useEffect(() => {
        (async () => {
            const status = await askForPermission();
            setPermissionStatus(status);
        })();
    },[])
    const handlePress = () => {

    }

    const handleProfilePicture = async () => {
        const result = await pickImage();
        if(!result.cancelled) {
            setSelectedImage(result.uri)
        }
    }
    if(!permissionStatus) {
        return <Text>Loading...</Text>
    }
    if(permissionStatus != 'granted') {
        return <Text>You need to allow this permission</Text>
    }
    return ( 
        <>
            <StatusBar barStyle='default' />
            <View style={{alignItems:'center',justifyContent:'center',flex:1,padding:20}}>
                <Text style={{fontSize: 22, color: colors.foreground}}>Profile Info</Text>
                <Text style={{fontSize: 14, color: colors.text, marginTop: 20}}>Please provide your name and an optional profile photo</Text>
                <TouchableOpacity 
                    onPress={handleProfilePicture}
                    style={{
                        marginTop:30, 
                        borderRadius: 120, 
                        width: 120, 
                        height: 120, 
                        backgroundColor: colors.background, 
                        alignItems: 'center', 
                        justifyContent: 'center'
                    }}
                >
                    {!selectedImage ? 
                        <MaterialCommunityIcons         
                            name="camera-plus" 
                            color={colors.iconGray} 
                            size={45}
                        />
                        :
                        <Image
                            source={{uri: selectedImage}}
                            style={{width: '100%', height: '100%', borderRadius: 120}}
                        />
                    }
                </TouchableOpacity>
                <TextInput placeholder="Type your name" value={displayName} onChangeText={setDisplayName} style={{borderBottomWidth: 2, borderColor: colors.primary, marginTop: 40, width: '100%'}} />
                <View style={{marginTop: "auto", width: 80}}>
                    <Button title="Next" color={colors.secondary} onPress={handlePress} disabled={!displayName} />
                </View>
            </View>
        </>
     );
}
 
export default Profile;