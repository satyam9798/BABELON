import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import images from "../../../constants/images";
import styles from "../../../styles/index.styles";
import { COLORS } from "../../../constants/theme";
import { WebSocketContext } from "../../context/socketProvider";
import { useSelector, useDispatch } from "react-redux";
import { setActiveChat } from "../../store/dataSlice";
import { useFocusEffect } from "@react-navigation/native";

const ChatDetails = ({ navigation, route }) => {
  const { data, userType, roomId, chatType, linkType } = route?.params || "";
  const socket = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const { activeChat, userData } = useSelector((state) => state.chatDataSlice);

  const [groupName, setGroupName] = useState(activeChat.username);
  const [groupDescription, setGroupDescription] = useState(
    activeChat.description
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [tempName, setTempName] = useState(groupName);
  const [tempDescription, setTempDescription] = useState(groupDescription);

  const members = data?.members;

  const handleSubmit = () => {
    if (!socket) return;
    const groupId = roomId.toString();
    const payload = {
      group_id: groupId,
      group_name: tempName,
      group_description: tempDescription,
      type: "update_group_details",
    };
    console.log(payload);
    socket.send(JSON.stringify(payload));
    // setGroupName(tempName);
    // setGroupDescription(tempDescription);
    dispatch(setActiveChat({ roomId, chatType }));
    setModalVisible(false);
  };
  const btnDisabled = () => {
    if (!tempName) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    console.log("active change", activeChat);
    if (userData && userData.name) {
      setGroupName(userData.name);
      setGroupDescription(userData.description);
    }
  }, [activeChat]);

  useFocusEffect(
    React.useCallback(() => {
      console.log("user room change");
      handleActiveChat();
    }, [userData, roomId])
  );

  const handleActiveChat = async () => {
    if (activeChat) {
      dispatch(setActiveChat({ roomId, chatType }));
    }
  };

  const renderMember = ({ item }) => (
    <View style={styles.detailsMemberItem}>
      <View style={styles.detailsMemberContainer}>
        <Image source={images.Single} style={styles.detailsMemberAvatar} />
      </View>
      <Text style={styles.detailsMemberName}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsNavBar}>
        <View style={styles.detailsIconContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("main");
            }}
          >
            <Image
              style={styles.detailsBackIcon}
              source={images.LeftArrowIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.detailsName}>Chat Details</Text>
      </View>
      <View style={styles.detailsHeader}>
        <View
          style={[
            styles.detailsGroupAvatar,
            {
              backgroundColor:
                linkType === "temporary"
                  ? COLORS.tempBackground
                  : COLORS.permanentBackground,
            },
          ]}
        >
          <Image
            source={chatType === "group" ? images.Group : images.Single}
            style={styles.detailsGroupImage}
          />
        </View>
        <Text style={styles.detailsGroupName}>{activeChat?.username}</Text>
        {chatType === "group" && (
          <>
            <Text style={styles.detailsGroupDescription}>
              {activeChat.description}
            </Text>
            <TouchableOpacity
              style={styles.detailsEditButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.detailsEditButtonText}>Edit</Text>
            </TouchableOpacity>
            <View style={styles.detailsMembersContainer}>
              <Text style={styles.detailsMembersTitle}>Members</Text>
              <View style={styles.memberContainer}>
                <FlatList
                  data={members}
                  renderItem={renderMember}
                  keyExtractor={(item) => item}
                />
              </View>
            </View>
          </>
        )}
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.detailsModalContainer}>
          <View style={styles.detailsModalContent}>
            <View style={styles.detailsModalHeader}>
              <Text style={styles.detailsChatModalHeader}>Group Details</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
                style={styles.detailsModalCloseBtn}
              >
                <Image style={styles.plusIcon} source={images.CrossIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.detailsText}>Group Name</Text>
            <TextInput
              style={styles.detailsInput}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Group Name"
              maxLength={20}
            />
            <Text style={styles.detailsText}>Group Description</Text>
            <TextInput
              style={styles.detailsInput}
              value={tempDescription}
              onChangeText={setTempDescription}
              placeholder="Group Description"
              multiline
              maxLength={100}
            />
            <TouchableOpacity
              disabled={btnDisabled()}
              style={
                btnDisabled()
                  ? styles.detailsSubmitButtonDisabled
                  : styles.detailsSubmitButton
              }
              onPress={handleSubmit}
            >
              <Text style={styles.detailsSubmitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChatDetails;
