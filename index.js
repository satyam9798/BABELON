import { registerRootComponent } from "expo";
import AppNavigator from "./app/src/AppNavigator/AppNavigator";
import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import store from "./app/src/store/store";
import { Provider } from "react-redux";
import { WebSocketProvider } from "./app/src/context/socketProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./app/src/components/WelcomeScreen/WelcomeScreens/WelcomeScreen";
import styles from "./app/styles/pages.style";
import Loader from "./app/src/components/loader/Loader";

const Stack = createNativeStackNavigator();

const Home = () => {
  const linking = {
    prefixes: [
      "https://babel-mf43trwll-satyam9798s-projects.vercel.app/app",
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
  const [fontsLoaded, fontError] = useFonts({
    "open-Sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Loader />;
  }

  return (
    <NavigationContainer
      independent={true}
      linking={linking}
      fallback={<Loader />}
    >
      <Provider store={store}>
        <WebSocketProvider>
          <AppNavigator />
        </WebSocketProvider>
      </Provider>
    </NavigationContainer>
  );
};
export default Home;
registerRootComponent(Home);
