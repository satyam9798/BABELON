import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import styles from "../../../styles/pages.style";
import images from "../../../constants/images";
import { RadioButton } from "react-native-paper";
import { COLORS } from "../../../constants/theme";
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createChat,
  createGroupChat,
} from "../../AppNavigator/services/apiServices";
import { useSelector, useDispatch } from "react-redux";
import { saveData } from "../../store/dataSlice";

const CreateChatModal = ({ closeModal, navigation, fetchData }) => {
  const dispatch = useDispatch();
  const [linkType, setLinkType] = useState("temporary");
  const [chatType, setChatType] = useState("single");

  const createLink = async () => {
    const access = await AsyncStorage.getItem("access");

    if (chatType === "single") {
      const payload = {
        access: access,
        linkType: linkType,
      };
      createChat(payload)
        .then((response) => {
          if (response.status == 401) {
            closeModal();
            Toast.show("please login again");
            navigation.navigate("RegistrationScreen");
          } else if (response?.ok) {
            response.json().then((body) => {
              const link = `https://bableon-django-1193e2d277c3.herokuapp.com/app/chat/2/${body.request_id}/${chatType}/${linkType}`;
              const tempBackground = "#92a8d1";
              const permanentBackground = "#eea29a";
              const currentDate = new Date();
              const year = currentDate.getFullYear();
              const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because month starts from 0
              const day = String(currentDate.getDate()).padStart(2, "0");
              const roomId =
                chatType == "single" ? body.request_id : body.group_id;
              const formattedDate = `${year}-${month}-${day}`;
              const data = {
                roomId: body.request_id,
                userType: 1,
                chatType: chatType,
                linkType: linkType,
                chatStatus: "",
                chatToken: "",
                displayPicture:
                  linkType == "temporary"
                    ? tempBackground
                    : permanentBackground,
                username: `unknown${body.request_id}`,
                msg: [],
                timestamp: formattedDate,
              };
              dispatch(saveData({ data: data, chatType: chatType }));
              navigation.navigate("linkShare", { link: link, data: data });

              closeModal();
            });
          } else {
            Toast.show("Unable to create a chat");
          }
        })
        .catch((error) => console.error("please register again", error));
    }
    if (chatType === "group") {
      const payload = {
        access: access,
        name: "Group",
        description: "description",
        linkType: linkType,
      };
      createGroupChat(payload)
        .then((response) => {
          if (response.status == 401) {
            closeModal();
            Toast.show("please login again");
            navigation.navigate("RegistrationScreen");
          } else if (response?.ok) {
            response.json().then((body) => {
              console.log("link craere", linkType, chatType, body);
              const link = `https://bableon-django-1193e2d277c3.herokuapp.com/app/chat/2/${body.group_id}/${chatType}/${linkType}`;
              const tempBackground = "#92a8d1";
              const permanentBackground = "#eea29a";
              const currentDate = new Date();
              const year = currentDate.getFullYear();
              const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because month starts from 0
              const day = String(currentDate.getDate()).padStart(2, "0");
              const roomId = body.group_id;
              const username = "Group" + roomId;
              const formattedDate = `${year}-${month}-${day}`;
              console.log("link url", linkType);
              const data = {
                roomId: body.group_id,
                userType: 1,
                chatType: chatType,
                linkType: linkType,
                chatStatus: "",
                chatToken: "",
                displayPicture:
                  linkType == "temporary"
                    ? tempBackground
                    : permanentBackground,
                username: username,
                msg: [],
                timestamp: formattedDate,
              };
              dispatch(saveData({ data: data, chatType: chatType }));
              navigation.navigate("linkShare", { link: link, data: data });
              closeModal();
            });
          } else {
            Toast.show("Unable to create a chat");
          }
        })
        .catch((error) => console.error("please register again", error));
    }
  };

  return (
    <Modal
      style={styles.centeredView}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <View style={styles.chatModal}>
        <View style={styles.modalView}>
          <View style={styles.ModalHeader}>
            <Text style={styles.ChatModalHeader}>Create a new chat</Text>
            <TouchableOpacity onPress={closeModal} style={styles.ModalCloseBtn}>
              <Image style={styles.plusIcon} source={images.CrossIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.ToggleContainer}>
            <Text style={styles.toggleText}>Select chat type</Text>
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <RadioButton
                  value="single"
                  status={chatType === "single" ? "checked" : "unchecked"}
                  onPress={() => setChatType("single")}
                />
                <Text style={{ marginHorizontal: 5, marginVertical: 7 }}>
                  Single
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <RadioButton
                  value="group"
                  status={chatType === "group" ? "checked" : "unchecked"}
                  onPress={() => setChatType("group")}
                />
                <Text style={{ marginHorizontal: 5, marginVertical: 7 }}>
                  {" "}
                  Group
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.ToggleContainer}>
            <Text style={styles.toggleText}>Select Link type</Text>
            <View>
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <RadioButton
                    value="temporary"
                    status={linkType === "temporary" ? "checked" : "unchecked"}
                    onPress={() => setLinkType("temporary")}
                  />
                  <Text style={{ marginHorizontal: 5, marginVertical: 7 }}>
                    Temporary
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <RadioButton
                  value="permanent"
                  // disabled='true'
                  status={linkType === "permanent" ? "checked" : "unchecked"}
                  onPress={() => setLinkType("permanent")}
                />
                <Text style={{ marginHorizontal: 5, marginVertical: 7 }}>
                  {" "}
                  Permanent
                </Text>
              </View>
              <View style={{ marginLeft: "1%" }}>
                {linkType == "permanent" ? (
                  <Text style={{ color: COLORS.grey }}> </Text>
                ) : (
                  <Text style={{ color: COLORS.grey }}>
                    Temporary chat link will expire after 24 Hrs
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              widhth: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity style={styles.chatLinkBtn} onPress={createLink}>
              <Text style={styles.chatLinkBtnText}>Create Link</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateChatModal;
