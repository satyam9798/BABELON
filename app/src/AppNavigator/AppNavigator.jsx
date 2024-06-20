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
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import { NavigationContainer } from "@react-navigation/native";
import Loader from "../components/loader/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const getInitialRouteName = async () => {
  try {
    const token = await AsyncStorage.getItem("access");
    return token ? "main" : "WelcomeScreen";
  } catch (error) {
    console.error("Failed to fetch initial route name:", error);
    return "WelcomeScreen"; // Default fallback
  }
};
const AppNavigator = ({}) => {
  const [initialRouteName, setInitialRouteName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const linking = {
    prefixes: [
      "https://bableon-django-1193e2d277c3.herokuapp.com/app",
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
    const fetchInitialRouteName = async () => {
      const routeName = await getInitialRouteName();
      setInitialRouteName(routeName);
      setIsLoading(false);
    };

    fetchInitialRouteName();
  }, []);
  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      const route = url.replace(/.*?:\/\//g, "");
      const routeName = route.split("/")[0];
      setTimeout(() => {
        navigation.navigate("main");
        Linking.openURL("main");
      }, 1000);
    };
    Linking.addEventListener("url", (event) => {
      handleDeepLink(event);
    });
  }, []);
  return (
    <>
      {initialRouteName && (
        <NavigationContainer
          independent={true}
          linking={linking}
          fallback={<Loader />}
        >
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={initialRouteName}
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
      )}
    </>
  );
};

export default AppNavigator;
