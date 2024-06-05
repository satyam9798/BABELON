import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../components/WelcomeScreen/Welcome";
import { NavigationContainer } from "@react-navigation/native";
import MainScreen from "../components/mainScreen/MainScreen";
import chatScreen from "../components/chatScreen/chatScreen";
import linkShare from "../components//linkShare/linkShare";
import * as Linking from "expo-linking";
import { Text, View } from "react-native";
import { useEffect } from "react";
import WelcomeScreen, {
  handleUrl,
} from "../components/WelcomeScreen/WelcomeScreens/WelcomeScreen";
import LandingScreen from "../components/WelcomeScreen/WelcomeScreens/LandingScreen";
import RegistrationScreen from "../components/WelcomeScreen/WelcomeScreens/RegistrationScreen";
import VerificationPage from "../components/InviteScreen/VerificationPage";
import ChooseLanguage from "../components/chooseLanguage/chooseLanguage";
import SocketEventHandler from "../components/socketNavigator/SocketEventHandler";
import Loader from "../components/loader/Loader";

const Stack = createNativeStackNavigator();

const prefix = Linking.createURL("/");
const AppNavigator = ({}) => {
  const linking = {
    prefixes: [
      "https://665f342e0a98f0064e613e65--monumental-panda-db5186.netlify.app/app",
      "babelon://",
      "",
      "/",
    ],
    config: {
      screens: {
        WelcomeScreen: "WelcomeScreen",
        main: "main",
        chat: {
          path: "chat/:userType/:roomId/:chatType/:linkType",
          parse: {
            userType: (userType) => `${userType}`,
            roomId: (roomId) => `${roomId}`,
            chatType: (chatType) => `${chatType}`,
            linkType: (linkType) => `${linkType}`,
          },
        },
      },
    },
  };
  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      console.warn("INCOMING REQ");
      const route = url.replace(/.*?:\/\//g, "");
      const routeName = route.split("/")[0];
      console.log("incoming param", routeName);
      setTimeout(() => {
        navigation.navigate("main");
      }, 1000);
    };
    Linking.addEventListener("url", (event) => {
      handleDeepLink(event);
    });
  }, []);
  return (
    <NavigationContainer
      independent={true}
      linking={linking}
      fallback={<Loader />}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="WelcomeScreen"
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <Stack.Screen name="otpverify" component={VerificationPage} />
        <Stack.Screen name="language" component={ChooseLanguage} />
        <Stack.Screen name="main" component={MainScreen} />
        <Stack.Screen name="linkShare" component={linkShare} />
        <Stack.Screen name="chat" component={chatScreen} />
        <Stack.Screen
          name="SocketEventHandler"
          component={SocketEventHandler}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
