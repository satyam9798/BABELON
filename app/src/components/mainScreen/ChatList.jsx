import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import styles from "../../../styles/index.styles";
import images from "../../../constants/images";

const ChatList = ({ data, navigation }) => {
  const initials = data.username.slice(0, 2).toUpperCase();
  const backgroundColor = data.displayPicture;

  const truncateUsername = (username) => {
    if (username.length > 20) {
      return username.slice(0, 20) + "...";
    }
    return username;
  };
  const truncateMsg = (msg) => {
    if (msg && msg.length > 30) {
      return msg.slice(0, 30) + "...";
    }
    return msg;
  };

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
            {/* <Text style={styles.initials}>{initials}</Text> */}
            {data.chatType === "group" ? (
              <Image style={styles.plusIcon} source={images.Group} />
            ) : (
              <Image style={styles.plusIcon} source={images.Single} />
            )}
          </View>

          <View style={styles.ChatlistText}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.ChatlistName}>
                {truncateUsername(data.username)}
              </Text>
            </View>
            <Text style={styles.ChatlistMsg}>
              {truncateMsg(data.msg[data.msg.length - 1]?.text)}
            </Text>
          </View>
          <Text style={styles.ChatlistDate}>{data.timestamp}</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChatList;
