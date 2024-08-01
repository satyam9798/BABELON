import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import messaging from "@react-native-firebase/messaging";
import { useSelector, useDispatch } from "react-redux";

import { getAsyncDetails } from "../../store/asyncSlice";

const InAppNotification = ({ navigation }) => {
  const dispatch = useDispatch();
  const { activeChat } = useSelector((state) => state.chatDataSlice);

  const [notification, setNotification] = useState(null);
  const [animation] = useState(new Animated.Value(-100));

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      dispatch(getAsyncDetails());

      console.log("from bar", remoteMessage);
      // navigation.navigate("chat", {
      //   data: activeChat,
      //   userType: remoteMessage.data.userType,
      //   roomId: remoteMessage.data.roomId,
      //   chatType: remoteMessage.data.chatType,
      //   linkType: remoteMessage.data.linkType,
      // });
      setNotification(remoteMessage);
      showNotification();
    });

    return unsubscribe;
  }, []);

  const showNotification = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(animation, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setNotification(null));
  };

  if (!notification) return null;

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: animation }] }]}
    >
      <TouchableOpacity
        onPress={() => {
          /* Handle notification tap */
          // navigation.navigate("chat", {
          //   data: activeChat,
          //   userType: notification.data.userType,
          //   roomId: notification.data.roomId,
          //   chatType: notification.data.chatType,
          //   linkType: notification.data.linkType,
          // });
        }}
      >
        <Text style={styles.title}>{notification.notification.title}</Text>
        <Text style={styles.body}>{notification.notification.body}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    backgroundColor: "#112545",
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 16,
    paddingTop: 40, // Adjust based on your status bar height
    zIndex: 1000,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  body: {
    color: "#fff",
    fontSize: 14,
  },
});

export default InAppNotification;
