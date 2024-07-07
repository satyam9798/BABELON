import React, { useEffect } from "react";
import { registerRootComponent } from "expo";
import AppNavigator from "./app/src/AppNavigator/AppNavigator";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import store from "./app/src/store/store";
import { Provider } from "react-redux";
import { WebSocketProvider } from "./app/src/context/socketProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loader from "./app/src/components/loader/Loader";
import * as Linking from "expo-linking";

const Home = () => {
  const [fontsLoaded, fontError] = useFonts({
    "open-Sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Loader />;
  }

  return (
    <NavigationContainer
      independent={true}

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
