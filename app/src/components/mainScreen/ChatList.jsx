import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import styles from "../../../styles/index.styles";
import images from "../../../constants/images";
import { setActiveChat } from "../../store/dataSlice";
import { useDispatch } from "react-redux";

const ChatList = ({ data, navigation }) => {
  // const initials = data.username.slice(0, 2).toUpperCase();
  const backgroundColor = data.displayPicture;
  const dispatch = useDispatch();

  const truncateUsername = (username) => {
    if (username.length > 15) {
      return username.slice(0, 15) + "...";
    }
    return username;
  };
  const truncateMsg = (msg) => {
    if (msg && msg.length > 20) {
      if (data?.msg[data.msg.length - 1]?.user?._id) {
        return msg.slice(0, 10) + "...";
      }
      return msg.slice(0, 30);
    }
    return msg;
  };

  return (
    <ScrollView style={styles.ChatlistContainer}>
      <TouchableOpacity
        onPress={async () => {
          try {
            await dispatch(
              setActiveChat({ roomId: data.roomId, chatType: data.chatType })
            );
            navigation.navigate("chat", {
              data: data,
              userType: data.userType,
              roomId: data.roomId,
              chatType: data.chatType,
              linkType: data.linkType,
            });
          } catch (error) {
            console.log(error);
          }
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
              {data?.msg[data.msg.length - 1]?.user?._id
                ? `${data.msg[data.msg.length - 1]?.user?._id} : `
                : ""}
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
