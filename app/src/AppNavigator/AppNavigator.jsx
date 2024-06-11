import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../components/mainScreen/MainScreen";
import chatScreen from "../components/chatScreen/chatScreen";
import linkShare from "../components//linkShare/linkShare";
import WelcomeScreen from "../components/WelcomeScreen/WelcomeScreens/WelcomeScreen";
import LandingScreen from "../components/WelcomeScreen/WelcomeScreens/LandingScreen";
import RegistrationScreen from "../components/WelcomeScreen/WelcomeScreens/RegistrationScreen";
import VerificationPage from "../components/InviteScreen/VerificationPage";
import ChooseLanguage from "../components/chooseLanguage/chooseLanguage";
import SocketEventHandler from "../components/socketNavigator/SocketEventHandler";

const Stack = createNativeStackNavigator();

const AppNavigator = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="WelcomeScreen"
    >
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      <Stack.Screen name="otpverify" component={VerificationPage} />
      <Stack.Screen name="language" component={ChooseLanguage} />
      <Stack.Screen name="main" component={MainScreen} />
      <Stack.Screen name="linkShare" component={linkShare} />
      <Stack.Screen name="chat" component={chatScreen} />
      <Stack.Screen name="SocketEventHandler" component={SocketEventHandler} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
