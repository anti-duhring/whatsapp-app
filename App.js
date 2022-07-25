import React, {useState, useEffect, useContext} from 'react';
import { Text, View, LogBox, StatusBar } from 'react-native';
import { useAssets } from 'expo-asset';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from './screens/SignIn'
import ContextWrapper from './context/ContextWrapper';
import Context from './context/Context';
import Profile from './screens/Profile'

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release."
])

const Stack = createStackNavigator();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {theme: {colors}} = useContext(Context)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,
        user => {
          setLoading(false)
          if(user) {
            setCurrentUser(user)
          }
        })

    return () => unsubscribe();
  },[])

  if(loading) {
    return (
      <Text>Loading...</Text>
    )
  }

  return (
    <ContextWrapper>
      <StatusBar />
    <NavigationContainer>
      {!currentUser ? 
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="signIn" component={SignIn} />
      </Stack.Navigator>
      :
      <Stack.Navigator screenOptions={{headerStyle: {
        backgroundColor: colors.foreground,
        shadowOpacity: 0,
        elevation: 0,
      }, headerTintColor: colors.whites
      }}>
        {!currentUser.displayName &&
        <Stack.Screen 
          name="profile" 
          component={Profile}
          options={{headerShown: false}}
        />
        }
      </Stack.Navigator>
      }
        <Stack.Screen 
          name="home" 
          component={Home}
          options={{title: 'Whatsapp'}}
        />
    </NavigationContainer>
    </ContextWrapper>
  );
}

const Home = () => {
  return <Text>Hi I have a profile</Text>
}

const Main = () => {
  const [assets] = useAssets(
    require('./assets/icon-square.png'),
    require('./assets/chatbg.png'),
    require('./assets/user-icon.png'),
    require('./assets/welcome-img.png')
  );
  if(!assets) {
    return <Text>Loading...</Text>
  }
  return <App />
}

export default Main