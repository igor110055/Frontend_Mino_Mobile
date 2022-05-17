
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// Components
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Functions
import { AsyncGetSessionToken } from './app/functions/GlobalFunctions';
import { getDbConnection, initDatabase } from './app/database';

// Stacks
import ApplicationContent from './app/stacks/ApplicationContent';

// Hooks
import { LangProvider } from './app/hooks/contexts/LangContext';
import Login from './app/screens/Login';

// Reducers
import { Provider as ReduxProvider } from 'react-redux';
import store from './app/store';

const Stack = createNativeStackNavigator();

export default function App() {
    const [sessionToken, setSessionToken] = useState("")

    useEffect(() => {
        AsyncGetSessionToken().then(value => {
            setSessionToken(value);
        });
        initDatabase();
    }, [])

    const [fontsLoaded] = useFonts({
        /* 'RooneySans-Light': require('./assets/fonts/rooneysans/RooneySansLight.woff'),
        'RooneySans': require('./assets/fonts/rooneysans/RooneySansRegular.woff'),
        'RooneySans-Medium': require('./assets/fonts/rooneysans/RooneySansMedium.woff'),*/
        'RooneySans-Bold': require('./assets/fonts/rooneysans/RooneySans-Bold.ttf'),
        /* 'RooneySans-Black': require('./assets/fonts/rooneysans/RooneySansBlk.woff'),  */

        'Nunito-ExtraLight': require('./assets/fonts/nunito/Nunito-ExtraLight.ttf'),
        'Nunito-Light': require('./assets/fonts/nunito/Nunito-Light.ttf'),
        'Nunito-SemiBold': require('./assets/fonts/nunito/Nunito-SemiBold.ttf'),
        'Nunito-Regular': require('./assets/fonts/nunito/Nunito-Regular.ttf'),
        'Nunito-Bold': require('./assets/fonts/nunito/Nunito-Bold.ttf'),
        'Nunito-ExtraBold': require('./assets/fonts/nunito/Nunito-ExtraBold.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <ReduxProvider store={store}>
                <NavigationContainer >
                    <LangProvider>
                        <Stack.Navigator
                            initialRouteName={sessionToken ? 'ApplicationContent' : 'Login'}
                            screenOptions={{ headerShown: false }}
                        >
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="ApplicationContent" component={ApplicationContent} />
                        </Stack.Navigator>
                    </LangProvider>
                </NavigationContainer>
            </ReduxProvider>
        );
    }
}
