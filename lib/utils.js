import * as ImagePicker from 'expo-image-picker'
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { storage } from '../firebase'
import { nanoid } from 'nanoid';
import "react-native-get-random-values"

export const pickImage = async () => {
    let result = ImagePicker.launchCameraAsync();
    return result
}
export const askForPermission = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    return status;
}

export const uploadImage = async (uri, path, fName) => {
    // why are we using HMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            resolve(xhr.response);
        }
        xhr.onerror = (e) => {
            console.log(e);
            reject(new TypeError("Network requested failed"));
        }
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    })

    const fileName = fName || nanoid();
    const imageRef = ref(storage, `${path}/${fileName}.jpeg`);

    const snapshot = await uploadBytes(imageRef, blob, {
        contentType: 'image/jpeg'
    })

    blob.close();

    const url = await getDownloadURL(snapshot.ref);

    return { url, fileName }
}