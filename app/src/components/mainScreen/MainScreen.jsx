import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import * as Linking from "expo-linking";
import messaging from "@react-native-firebase/messaging";
import firebase from "@react-native-firebase/app";
import { PermissionsAndroid, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import ChatScene from "./ChatScene";
import styles from "../../../styles/index.styles";
import images from "../../../constants/images";
import CreateChatModal from "../modal/CreateChatModal";

import { getAsyncDetails, handleFcmToken } from "../../store/asyncSlice";
import { retreiveData, setActiveChat } from "../../store/dataSlice";
import { WebSocketContext } from "../../context/socketProvider";
import InAppNotification from "../modal/InAppNotification";

const MainScreen = ({ navigation }) => {
  const socket = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const { userData, activeChat, socketActive } = useSelector(
    (state) => state.chatDataSlice
  );
  const [data, setData] = useState();
  const [showCreateLinkModal, setShowCreateLinkModal] = useState(false);
  const [chatFilter, setChatFilter] = useState("all");

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  useEffect(() => {
    dispatch(getAsyncDetails());
    Linking.getInitialURL()
      .then(async (url) => {
        if (url !== null) {
          const supported = await Linking.canOpenURL(url);
          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            // await Linking.openURL("babelon://main");
          } else {
            // Alert.alert(`Don't know how to open this URL: ${url}`);
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

  useEffect(() => {
    const sendQueuedMessages = async () => {
      if (socketActive === "active") {
        const existingData = await AsyncStorage.getItem("userData");
        if (existingData) {
          const userQueueData = JSON.parse(existingData);
          for (const chatType of ["single", "group"]) {
            if (userQueueData[chatType]) {
              for (const chat of userQueueData[chatType]) {
                if (chat?.queuedMsg && chat?.queuedMsg.length > 0) {
                  for (const message of chat.queuedMsg) {
                    socket.send(JSON.stringify(message));
                  }
                  chat.queuedMsg = []; // Clear the queue after sending
                }
              }
            }
          }
          await AsyncStorage.setItem("userData", JSON.stringify(userQueueData));
          dispatch(getAsyncDetails());
        }
      }
    };

    sendQueuedMessages();
  }, [socketActive, userData]);

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

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          dispatch(getAsyncDetails());
          navigation.navigate("chat", {
            data: activeChat,
            userType: remoteMessage.data.userType,
            roomId: remoteMessage.data.roomId,
            chatType: remoteMessage.data.chatType,
            linkType: remoteMessage.data.linkType,
          });
        }
      });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      if (remoteMessage) {
        console.log("notification caused app to open", remoteMessage);
      }
    });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("message handled in background", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("New FCM message arrived", remoteMessage);
      // Alert.alert(remoteMessage.data.hello);
    });

    messaging()
      .unsubscribeFromTopic("topic")
      .then(() => {});

    return () => {
      // unsubscribe;
      // console.log("Unmouting web socket");
      // if (socket) socket.close();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAsyncDetails());
      dispatch(retreiveData({}));
    }, [socket])
  );

  useEffect(() => {
    if (userData && userData.length >= 1) {
      const parsedData = JSON.parse(userData);
      const allChats = Object.values(parsedData).flatMap((chatType) =>
        Array.isArray(chatType) ? chatType : []
      );
      setData(allChats);
    }
    // delete async data (needed in ENV="DEV" to clear values)
    // AsyncStorage.removeItem("userData");
    // AsyncStorage.removeItem("queuedMsg");
    // AsyncStorage.removeItem("websocket_token");
  }, [userData]);

  const CreateChatHandle = () => {
    setShowCreateLinkModal(true);
  };
  const CloseChatHandle = () => {
    setShowCreateLinkModal(false);
  };
  const HandleSearch = (text) => {
    if (userData && userData.length >= 1) {
      const parsedData = JSON.parse(userData);
      const allChats = Object.values(parsedData).flatMap((chatType) =>
        Array.isArray(chatType) ? chatType : []
      );
      if (text.length >= 1) {
        if (allChats && allChats.length >= 1) {
          const filterData = allChats.filter((item) =>
            item.username.toLowerCase().includes(text.toLowerCase())
          );

          setData(filterData);
        }
      } else {
        if (userData && userData.length >= 1) {
          const parsedData = JSON.parse(userData);
          const allChats = Object.values(parsedData).flatMap((chatType) =>
            Array.isArray(chatType) ? chatType : []
          );
          setData(allChats);
        }
      }
    }
  };
  const HandleFilterChange = (filter) => {
    setChatFilter(filter);
    // const parsedData = JSON.parse(userData);
    if (userData && userData.length >= 1) {
      if (filter === "all") {
        const parsedData = JSON.parse(userData);
        const allChats = Object.values(parsedData).flatMap((chatType) =>
          Array.isArray(chatType) ? chatType : []
        );
        setData(allChats);
      } else if (filter === "individual") {
        const parsedData = JSON.parse(userData);
        const allChats = parsedData["single"];
        setData(allChats);
      } else if (filter === "group") {
        const parsedData = JSON.parse(userData);
        const allChats = parsedData["group"];
        setData(allChats);
      }
    }
  };

  return (
    <View style={[styles.mainContainer, styles.bgOpacity]}>
      <View style={styles.MainNavbar}>
        <View>
          <Text style={styles.NavbarText}>Chats</Text>
        </View>
      </View>
      <View style={styles.MainSearchInput}>
        <TextInput
          inputMode="text"
          placeholder="Search"
          style={styles.searchInput}
          onChangeText={(text) => HandleSearch(text)}
        />
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => HandleFilterChange("all")}>
          <Text
            style={[
              styles.filterText,
              chatFilter === "all" && styles.filterTextSelected,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => HandleFilterChange("individual")}>
          <Text
            style={[
              styles.filterText,
              chatFilter === "individual" && styles.filterTextSelected,
            ]}
          >
            Individual
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => HandleFilterChange("group")}>
          <Text
            style={[
              styles.filterText,
              chatFilter === "group" && styles.filterTextSelected,
            ]}
          >
            Group
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <ChatScene data={data} navigation={navigation} />
      </View>
      {showCreateLinkModal && (
        <>
          <CreateChatModal
            closeModal={CloseChatHandle}
            navigation={navigation}
          />
        </>
      )}
      <TouchableOpacity style={styles.newChatButton} onPress={CreateChatHandle}>
        <Image style={styles.plusIcon} source={images.Pencil} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => {
          navigation.navigate("settings");
        }}
      >
        <Image style={styles.plusIcon} source={images.Settings} />
      </TouchableOpacity>
      <InAppNotification navigation />
    </View>
  );
};

export default MainScreen;
