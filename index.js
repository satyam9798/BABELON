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
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { PermissionsAndroid, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Home = () => {
  // if (!firebase.apps.length) {
  //   firebase.initializeApp(config);
  // }
  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL);
  };
  useEffect(() => {
    checkApplicationPermission();

    if (requestUserPermission()) {
      messaging().getToken().then(async (fcmToken) => {
        console.log("FCM TOKEN : ", fcmToken);
        await AsyncStorage.setItem("fcmToken", fcmToken)
      });
    } else {
      console.log("Request not authorized for FCM");
    };

    // messaging().getInitialNotification().then(async remoteMessage => {
    //   if (remoteMessage) {
    //     console.log('app opened from notification : ', remoteMessage);
    //   }
    // });

    // messaging().onNotificationOpenedApp(async remoteMessage => {
    //   if (remoteMessage) {
    //     console.log('notification caused app to open');
    //   }
    // });
    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   console.log("message handled in background");
    // });

    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   console.log("New FCM message arrived");
    // });

    // messaging().unsubscribeFromTopic(TOPIC).then(() => {
    //   console.log(TOPIC, " subscribed");
    // })

    return () => {
      unsubscribe;
    }

  }, [])

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
