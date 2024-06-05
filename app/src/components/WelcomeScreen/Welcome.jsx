import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from "./WelcomeScreens/WelcomeScreen";
import LandingScreen from "./WelcomeScreens/LandingScreen";
import RegistrationScreen from "./WelcomeScreens/RegistrationScreen";
import VerificationPage from "../InviteScreen/VerificationPage";
import ChooseLanguage from '../../components/chooseLanguage/chooseLanguage';



const Stack = createNativeStackNavigator();

const Welcome = () => {

    return (

        <Stack.Navigator screenOptions={{
            headerShown: false
        }}
            initialRouteName="WelcomeScreen">
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="LandingScreen" component={LandingScreen} />
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
            <Stack.Screen name="otpverify" component={VerificationPage} />
            <Stack.Screen name="language" component={ChooseLanguage} />
        </Stack.Navigator>

    )
}

export default Welcome;