import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
} from "react-native";
import styles from "../../../styles/pages.style";

const ChatList = ({ data, navigation }) => {
  const initials = data.username.slice(0, 2).toUpperCase();
  const backgroundColor = data.displayPicture;
  return (
    <ScrollView style={styles.ChatlistContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("chat", {
            data: data,
            userType: data.userType,
            roomId: data.roomId,
            chatType: data.chatType,
            linkType: data.linkType,
          });
        }}
      >
        <View style={styles.ChatListBox}>
          <View style={[styles.chatImgContainer, { backgroundColor }]}>
            <Text style={styles.initials}>{initials}</Text>
          </View>

          <View style={styles.ChatlistText}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.ChatlistName}>{data.username}</Text>
            </View>
            <Text style={styles.ChatlistMsg}>
              {data.msg[data.msg.length - 1]?.text}
            </Text>
          </View>
          <Text style={styles.ChatlistDate}>{data.timestamp}</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChatList;
