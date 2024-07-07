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
import { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Loader from "../components/loader/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
import SettingsPage from "../components/profile/Settings";

const Stack = createNativeStackNavigator();

const getInitialRouteName = async () => {
  try {
    // setTimeout(async () => {
    console.log(1);
    const token = await AsyncStorage.getItem("access");
    const username = await AsyncStorage.getItem("username");
    console.log(2, username);
    if (token && username) {
      return "main";
    } else {
      return "WelcomeScreen";
    }
    // }, 2000);
  } catch (error) {
    console.error("Failed to fetch initial route name:", error);
    return "WelcomeScreen"; // Default fallback
  }
};
const AppNavigator = ({}) => {
  const [initialRouteName, setInitialRouteName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const navigationRef = useRef();
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
    async getInitialURL() {
      return Linking.getInitialURL();
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
    Linking.getInitialURL()
      .then(async (url) => {
        if (url !== null) {
          console.log("navigating to url", url);
          const supported = await Linking.canOpenURL(url);
          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            // await Linking.openURL("babelon://main");
          } else {
            console.log("unSupported link");

            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
          // navigation.navigate(url);
          // if opened from notification if app is killed
        }
      })
      .catch((err) => console.error("An error occurred", err));

    let subcribtion = Linking.addEventListener("url", handleOpenURL);
    subcribtion.subscriber;

    return () => {
      subcribtion.remove();
    };
  }, []);

  async function handleOpenURL(evt) {
    // Will be called when the link is pressed foreground
    const supported = await Linking.canOpenURL(evt.url);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      // await Linking.openURL(url);
    } else {
      console.log("unSupported link");
    }
  }

  if (isLoading || !initialRouteName) {
    return <Loader />;
  }

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
            <Stack.Screen name="settings" component={SettingsPage} />
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
