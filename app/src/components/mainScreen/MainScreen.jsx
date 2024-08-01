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

const MainScreen = ({ navigation }) => {
  const socket = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const { userData, activeChat } = useSelector((state) => state.chatDataSlice);
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
  useEffect(() => {
    return () => {
      console.log("Unmouting web socket");
      if (socket) socket.close();
    };
  }, []);
  useEffect(() => {
    // checkApplicationPermission();

    // if (requestUserPermission()) {
    //   messaging()
    //     .getToken()
    //     .then((fcmToken) => {
    //       console.log("FCM TOKEN : ", fcmToken);
    //       dispatch(handleFcmToken({ fcmToken }));
    //     });
    // } else {
    //   console.log("Request not authorized for FCM");
    // }

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          dispatch(getAsyncDetails());
          console.log("app opened from notification : ", remoteMessage);
          // await getCurrentchatData(remoteMessage.data);
          // navigation.navigate("chatDetails");
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
        console.log("notification caused app to open");
      }
    });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("message handled in background");
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("New FCM message arrived");
    });

    // messaging().unsubscribeFromTopic(TOPIC).then(() => {
    //   console.log(TOPIC, " subscribed");
    // })

    return () => {
      unsubscribe;
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
    // AsyncStorage.removeItem("access");
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
    console.log("data", userData);
    const parsedData = JSON.parse(userData);
    // console.log(parsedData["group"]);
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
    // <SafeAreaView>
    //   <ImageBackground
    //     source={images.BackgroundImage}
    //     resizeMode="cover"
    //     style={styles.container}
    //   >
    //     <LinearGradient
    //       colors={["#373540", "#23202c"]}
    //       locations={[0.5, 0.8]}
    //       style={[styles.container, styles.bgOpacity]}
    //     >
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
    </View>
    // {/* <SocketEventHandler /> */}
    //     </LinearGradient>
    //   </ImageBackground>
    // </SafeAreaView>
  );
};

export default MainScreen;
