import React, { useState, useEffect, useRef, useContext } from "react";
import {
  GiftedChat,
  InputToolbar,
  Send,
  Bubble,
} from "react-native-gifted-chat";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  TextInput,
  FlatList,
} from "react-native";
import styles from "../../../styles/index.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import images from "../../../constants/images";
import {
  acceptRequest,
  acceptGroupRequest,
} from "../../AppNavigator/services/apiServices";
import Toast from "react-native-simple-toast";
import { useFocusEffect } from "@react-navigation/native";
import { WebSocketContext } from "../../context/socketProvider";
import { saveMessage, saveData, setActiveChat } from "../../store/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import { retreiveAsyncData } from "../../store/asyncSlice";
import CustomInputToolbar from "./CustomInputToolBar";

const Chat = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const socket = useContext(WebSocketContext);
  const { activeChat, userData } = useSelector((state) => state.chatDataSlice);
  const { mobileNum, username } = useSelector((state) => state.asyncDataSlice);
  const [clearInput, setClearInput] = useState(false);
  // const [modalVisible, setModalVisible] = useState(false);
  // const [scrollOffset, setScrollOffset] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!socket) return;
    const activePayload = {
      type: "chat_active",
      roomId,
      active: "true",
    };
    console.log("active payload", activePayload);
    socket.send(JSON.stringify(activePayload));
  }, [socket, roomId]);
  const [transcriptEnabled, setTranscriptEnabled] = useState(false);
  const toggleSwitch = () =>
    setTranscriptEnabled((previousState) => !previousState);

  const { data, userType, roomId, chatType, linkType } = route?.params || "";
  const [chatData, setChatData] = useState(data);

  const [chatName, setChatName] = useState();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const maxCharacters = 180;

  useEffect(() => {
    handlelink();
  }, [roomId]);
  useEffect(() => {
    if (activeChat && activeChat.msg && activeChat.translatedMsg) {
      if (transcriptEnabled) {
        const sortedMessages = activeChat.translatedMsg.slice().sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        sortedMessages.map((item) => {});
        setMessages(sortedMessages);
        setChatName(activeChat.username);
      } else {
        const sortedMessages = activeChat.msg.slice().sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        sortedMessages.map((item) => {});
        setMessages(sortedMessages);
        setChatName(activeChat.username);
      }
    }
  }, [transcriptEnabled]);

  const handlelink = async () => {
    if (userType == "1") {
    } else if (userType == "2") {
      if (chatType == "single") {
        const dataExist = await chatDataExist();
        if (!dataExist) {
          acceptChatRequest();
        }
      } else if (chatType == "group") {
        const dataExist = await chatDataExist();
        if (!dataExist) {
          acceptGroupChatRequest();
        }
      }
    }
  };

  const chatDataExist = async () => {
    const asyncData = await AsyncStorage.getItem("userData");
    const userAsyncData = JSON.parse(asyncData);
    if (!userAsyncData) {
      return false;
    }
    if (!userAsyncData[chatType]) {
      return false;
    }
    const userExistData = userAsyncData[chatType].filter(
      (item) => item.roomId == roomId
    );
    if (userExistData.length != 0) {
      return true;
    } else {
      return false;
    }
  };

  async function acceptChatRequest() {
    const token = await AsyncStorage.getItem("access");
    const payload = {
      ssoToken: token,
      request_id: roomId,
    };
    acceptRequest(payload)
      .then((response) => {
        if (response.ok) {
          response.json().then((body) => {
            if (body.message == "Connection request accepted") {
              const currentDate = new Date();
              const year = currentDate.getFullYear();
              const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because month starts from 0
              const day = String(currentDate.getDate()).padStart(2, "0");

              const formattedDate = `${year}-${month}-${day}`;
              const tempBackground = "#92a8d1";
              const permanentBackground = "#eea29a";
              const background =
                "#" + Math.floor(Math.random() * 16777215).toString(16);
              const setData = {
                roomId: roomId,
                userType: 2,
                chatStatus: body.message,
                chatToken: "",
                chatType: chatType,
                linkType: linkType,
                displayPicture:
                  linkType == "temporary"
                    ? tempBackground
                    : permanentBackground,
                username: `unknown${roomId}`,
                msg: [],
                translatedMsg: [],
                timestamp: formattedDate,
              };
              dispatch(saveData({ data: setData, chatType: chatType }));
            } else if (
              body.message ==
              "Connection request can be used with a single person only"
            ) {
              Toast.show("Chat link is invalid");
            }
          });
        } else {
          Toast.show("Unable to create a chat");
        }
      })
      .catch((error) => {
        Toast.show("Error occured");
        console.error("please try again", error);
      });
  }
  async function acceptGroupChatRequest() {
    const token = await AsyncStorage.getItem("access");
    const payload = {
      ssoToken: token,
      request_id: roomId,
    };
    acceptGroupRequest(payload)
      .then((response) => {
        if (response.ok) {
          response.json().then((body) => {
            if (body.message == "Joined in the group") {
              const currentDate = new Date();
              const year = currentDate.getFullYear();
              const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because month starts from 0
              const day = String(currentDate.getDate()).padStart(2, "0");

              const formattedDate = `${year}-${month}-${day}`;
              const tempBackground = "#92a8d1";
              const permanentBackground = "#eea29a";
              const setData = {
                roomId: roomId,
                userType: 2,
                chatType: chatType,
                linkType: linkType,
                chatStatus: body.message,
                chatToken: "",
                displayPicture:
                  linkType == "temporary"
                    ? tempBackground
                    : permanentBackground,
                username: `group${roomId}`,
                msg: [],
                translatedMsg: [],
                description: "Group description",
                members: [],
                timestamp: formattedDate,
              };
              dispatch(saveData({ data: setData, chatType: chatType }));
              setChatData(setData);
            } else if (
              body.message ==
              "Connection request can be used with a single person only"
            ) {
            }
          });
        } else {
          Toast.show("Unable to create a chat");
        }
      })
      .catch((error) => {
        Toast.show("Error occured");
        console.error("please try again", error);
      });
  }
  //Input toolbar- customized
  const customtInputToolbar = (props) => {
    return (
      <>
        <View style={styles.inputContainer}>
          <Text style={styles.charCount}>
            {text.length} / {maxCharacters}
          </Text>
        </View>
        <InputToolbar
          {...props}
          containerStyle={{
            backgroundColor: "#E8E8E8",
            borderTopColor: "#E8E8E8",
            borderTopWidth: 1,
            padding: 8,
            borderRadius: 50,
            marginHorizontal: 10,
            height: 50,
            marginBottom: 20,
            justifyContent: "center",
          }}
          renderSend={(props) => {
            return (
              <>
                <Send
                  {...props}
                  containerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    marginRight: 15,
                  }}
                ></Send>
              </>
            );
          }}
        />
      </>
    );
    // return (
    //   <View>
    //     <InputToolbar
    //       {...props}
    //       containerStyle={styles.toolbarContainer}
    //       renderComposer={(composerProps) => (
    //         <View style={styles.inputContainer}>
    //           <TextInput
    //             {...composerProps}
    //             value={text}
    //             onChangeText={handleTextChange}
    //             style={styles.textInput}
    //           />
    //           <Text style={styles.charCount}>
    //             {text.length} / {maxCharacters}
    //           </Text>
    //         </View>
    //       )}
    //       renderSend={(props) => {
    //         return (
    //           <>
    //             <Send
    //               {...props}
    //               containerStyle={{
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //                 alignSelf: "center",
    //                 marginRight: 15,
    //               }}
    //             ></Send>
    //           </>
    //         );
    //       }}
    //     />
    //   </View>
    // );
  };

  const customBubbleContainer = (props, index) => {
    return (
      <Bubble
        key={index}
        {...props}
        wrapperStyle={{
          right: {
            borderTopRightRadius: 15,
            backgroundColor: "#95ADAA",
            borderRadius: 30,
            borderBottomRightRadius: 30,
            marginBottom: 5,
            padding: 5,
            right: 5,
            justifyContent: "flex-end",
            alignSelf: "stretch",
            marginLeft: 0,
            alignSelf: "end",
          },
          left: {
            borderTopLeftRadius: 15,
            borderRadius: 30,
            borderBottomRightRadius: 30,
            marginBottom: 5,
            padding: 5,
            right: 5,
            justifyContent: "flex-end",
            alignSelf: "stretch",
            marginLeft: 0,
            alignSelf: "end",
          },
        }}
        containerStyle={{
          right: {
            borderRadius: 30,
            borderBottomRightRadius: 30,
            marginBottom: 5,
            padding: 5,
            right: 5,
            justifyContent: "flex-end",
            alignSelf: "stretch",
            marginLeft: 0,
            alignSelf: "end",
          },
          left: {
            borderRadius: 30,
            borderBottomRightRadius: 30,
            marginBottom: 1,
          },
        }}
      ></Bubble>
    );
  };
  const handleActiveChat = async () => {
    const dataExist = await chatDataExist();
    if (dataExist) {
      dispatch(setActiveChat({ roomId, chatType }));
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      handleActiveChat();
    }, [userData, roomId])
  );
  useFocusEffect(
    React.useCallback(() => {
      if (activeChat && activeChat.msg && activeChat.translatedMsg) {
        if (transcriptEnabled) {
          const sortedMessages = activeChat.translatedMsg
            .slice()
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
          sortedMessages.map((item) => {});
          setMessages(sortedMessages);
          setChatName(activeChat.username);
        } else {
          const sortedMessages = activeChat.msg.slice().sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          sortedMessages.map((item) => {});
          setMessages(sortedMessages);
          setChatName(activeChat.username);
        }
      }
    }, [activeChat])
  );
  useFocusEffect(
    React.useCallback(() => {
      dispatch(retreiveAsyncData());
      if (activeChat && activeChat.msg && activeChat.translatedMsg) {
        if (transcriptEnabled) {
          const sortedMessages = activeChat.translatedMsg
            .slice()
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
          sortedMessages.map((item) => {});
          setMessages(sortedMessages);
          setChatName(activeChat.username);
        } else {
          const sortedMessages = activeChat.msg.slice().sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          sortedMessages.map((item) => {});
          setMessages(sortedMessages);
          setChatName(activeChat.username);
        }
      }
    }, [])
  );

  useEffect(() => {
    if (clearInput) {
      setClearInput(false);
    }
  }, [clearInput]);
  const onSend = (messages = []) => {
    const modifiedMessage = {
      ...messages[0],
      user: {
        ...messages[0].user,
        _id: `${mobileNum}`,
        name: `${username}`,
      },
    };
    if (!socket) return;
    if (chatType == "single") {
      const message = {
        type: "send_message",
        request_id: roomId.toString(),
        content: modifiedMessage,
        user_number: mobileNum,
      };
      socket.send(JSON.stringify(message));
      const payload = {
        roomId: roomId,
        content: messages[0],
        translatedContent: messages[0],
        chatType: "single",
      };
      dispatch(saveMessage(payload));
      setClearInput(true);
    }
    if (chatType == "group") {
      const message = {
        type: "send_group_message",
        group_id: roomId.toString(),
        content: modifiedMessage,
        user_number: mobileNum,
      };
      socket.send(JSON.stringify(message));
      const payload = {
        roomId: roomId,
        content: messages[0],
        translatedContent: messages[0],
        chatType: "group",
      };
      dispatch(saveMessage(payload));
      setClearInput(true);
    }
  };

  return (
    <React.Fragment>
      <View style={styles.chatContainer}>
        <View style={styles.chatNavBar}>
          <TouchableOpacity
            onPress={() => {
              setChatData();
              if (!socket) return;
              const activePayload = {
                type: "chat_active",
                roomId,
                active: "false",
              };
              console.log("active payload", activePayload);
              socket.send(JSON.stringify(activePayload));
              navigation.navigate("main");
            }}
          >
            <Image style={styles.chatBackIcon} source={images.LeftArrowIcon} />
          </TouchableOpacity>
          {activeChat && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("chatDetails", {
                  data,
                  userType,
                  roomId,
                  chatType,
                  linkType,
                });
              }}
            >
              <Text style={styles.chatName}>{activeChat.username}</Text>
            </TouchableOpacity>
          )}
          <View>
            <Text style={styles.transSwitchText}>Transcript</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={transcriptEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={transcriptEnabled}
            />
          </View>
          {/* <View style={styles.regDropdownContainer}>
            <Dropdown
              style={[styles.regDropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.regPlaceholderStyle}
              selectedTextStyle={styles.regSelectedTextStyle}
              inputSearchStyle={styles.regInputSearchStyle}
              iconStyle={styles.regIconStyle}
              data={transcriptType}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "   +   " : "  ...  "}
              searchPlaceholder="Search"
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setTranscript(item.value);
                setIsFocus(false);
              }}
            />
          </View> */}
        </View>
        {userType && (
          <>
            <GiftedChat
              messagesContainerStyle={{
                backgroundColor: "white",
                height: "100%",
                paddingBottom: 70,
              }}
              renderUsernameOnMessage={true}
              messages={messages}
              onSend={(messages) => onSend(messages)}
              showAvatarForEveryMessage={true}
              renderAvatar={null}
              // alwaysShowSend={true}
              // renderInputToolbar={(props) => customtInputToolbar(props)}
              renderBubble={(props, index) =>
                customBubbleContainer(props, index)
              }
              renderInputToolbar={(props) => (
                <CustomInputToolbar
                  {...props}
                  members={activeChat.members}
                  clearInput={clearInput}
                />
              )}
            />
          </>
        )}
      </View>
    </React.Fragment>
  );
};

export default Chat;
