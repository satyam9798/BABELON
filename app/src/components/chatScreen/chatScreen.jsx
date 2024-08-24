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
  Alert,
} from "react-native";
import styles from "../../../styles/index.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import * as Linking from "expo-linking";
import { CommonActions } from "@react-navigation/native";

import images from "../../../constants/images";
import {
  acceptRequest,
  acceptGroupRequest,
} from "../../AppNavigator/services/apiServices";
import Toast from "react-native-simple-toast";
import { useFocusEffect } from "@react-navigation/native";
import { WebSocketContext } from "../../context/socketProvider";
import {
  saveMessage,
  saveData,
  setActiveChat,
  updateQueuedMessage,
} from "../../store/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import { getAsyncDetails, retreiveAsyncData } from "../../store/asyncSlice";
import CustomInputToolbar from "./CustomInputToolBar";
import InAppNotification from "../modal/InAppNotification";

const Chat = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const socket = useContext(WebSocketContext);
  const { activeChat, userData, socketActive } = useSelector(
    (state) => state.chatDataSlice
  );
  const { mobileNum, username } = useSelector((state) => state.asyncDataSlice);
  const [isOnline, setIsOnline] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const [clearInput, setClearInput] = useState(false);
  let socketStatus = useRef(socketActive);
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
    if (activeChat.roomId !== roomId) {
      setMessages([]);
      setChatName("");
    }
    if (roomId && socketActive === "active") {
      const activePayload = {
        type: "chat_active",
        roomId,
        chatType,
        active: "true",
      };
      socket.send(JSON.stringify(activePayload));
    }
  }, [roomId]);
  useEffect(() => {
    console.log(":: socket status ::  ", socketActive);
    if (socketActive === "active") {
      const notifyMembers = {
        type: "notify_members",
        group_id: roomId.toString(),
      };
      const getChats = {
        type: "get_chats",
      };
      console.log("sending to socket ::", getChats, notifyMembers);
      socket.send(JSON.stringify(getChats));
      socket.send(JSON.stringify(notifyMembers));
    }
  }, [socketActive, userData, activeChat]);
  useEffect(() => {
    Linking.getInitialURL()
      .then(async (url) => {
        if (url !== null) {
          const token = await AsyncStorage.getItem("access");
          const username = await AsyncStorage.getItem("username");
          if (!token || !username) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "WelcomeScreen" }],
              })
            );
          }
        }
      })
      .catch((err) => console.error("An error occurred", err));

    return () => {};
  }, []);

  useEffect(() => {
    handlelink();
  }, [roomId]);
  useEffect(() => {
    if (activeChat && activeChat.msg && activeChat.translatedMsg) {
      if (activeChat.roomId !== roomId) {
        setMessages([]);
        setChatName("Loading...");
      } else if (transcriptEnabled) {
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
        messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
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
                queuedMsg: [],
                translatedMsg: [],
                timestamp: formattedDate,
                createdAt: Date.now(),
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
                username:
                  body?.group_name === "Group"
                    ? `group${roomId}`
                    : body.group_name,
                msg: [],
                queuedMsg: [],
                translatedMsg: [],
                description: body?.group_description || "Group description",
                members: [],
                timestamp: formattedDate,
                createdAt: Date.now(),
              };
              dispatch(saveData({ data: setData, chatType: chatType }));
              setChatData(setData);
            } else if (
              body.message ==
              "Connection request can be used with a single person only"
            ) {
              Toast.show("Chat link has been used");
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
  // const customtInputToolbar = (props) => {
  //   return (
  //     <>
  //       <View style={styles.inputContainer}>
  //         <Text style={styles.charCount}>
  //           {text.length} / {maxCharacters}
  //         </Text>
  //       </View>
  //       <InputToolbar
  //         {...props}
  //         containerStyle={{
  //           backgroundColor: "#E8E8E8",
  //           borderTopColor: "#E8E8E8",
  //           borderTopWidth: 1,
  //           padding: 8,
  //           borderRadius: 50,
  //           marginHorizontal: 10,
  //           height: 50,
  //           marginBottom: 20,
  //           justifyContent: "center",
  //         }}
  //         renderSend={(props) => {
  //           return (
  //             <>
  //               <Send
  //                 {...props}
  //                 containerStyle={{
  //                   justifyContent: "center",
  //                   alignItems: "center",
  //                   alignSelf: "center",
  //                   marginRight: 15,
  //                 }}
  //               ></Send>
  //             </>
  //           );
  //         }}
  //       />
  //     </>
  //   );
  //   // return (
  //   //   <View>
  //   //     <InputToolbar
  //   //       {...props}
  //   //       containerStyle={styles.toolbarContainer}
  //   //       renderComposer={(composerProps) => (
  //   //         <View style={styles.inputContainer}>
  //   //           <TextInput
  //   //             {...composerProps}
  //   //             value={text}
  //   //             onChangeText={handleTextChange}
  //   //             style={styles.textInput}
  //   //           />
  //   //           <Text style={styles.charCount}>
  //   //             {text.length} / {maxCharacters}
  //   //           </Text>
  //   //         </View>
  //   //       )}
  //   //       renderSend={(props) => {
  //   //         return (
  //   //           <>
  //   //             <Send
  //   //               {...props}
  //   //               containerStyle={{
  //   //                 justifyContent: "center",
  //   //                 alignItems: "center",
  //   //                 alignSelf: "center",
  //   //                 marginRight: 15,
  //   //               }}
  //   //             ></Send>
  //   //           </>
  //   //         );
  //   //       }}
  //   //     />
  //   //   </View>
  //   // );
  // };

  const TickIndicator = ({ status }) => {
    let ticks;
    switch (status) {
      case "sent":
        ticks = "✓";
        break;
      case "delivered":
        ticks = "✓✓";
        break;
      case "read":
        ticks = "✓✓";
        color = "#4FC3F7"; // Blue color
        break;
      default:
        ticks = "✓";
    }

    return (
      <Text
        style={{
          fontSize: 10,
          color: status === "read" ? "#4FC3F7" : "gray",
          marginLeft: 5,
        }}
      >
        {ticks}
      </Text>
    );
  };

  const customBubbleContainer = (props, index) => {
    return (
      <View
        style={{
          fontSize: 10,
          marginLeft: 5,
          display: "flex",
          flexDirection: "row",
        }}
      >
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
        {/* {props.position === "right" && (
          <TickIndicator status={props?.currentMessage?.status} />
        )} */}
      </View>
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
      if (activeChat) {
        isChatExpired(activeChat?.linkType, activeChat?.createdAt);
      }
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

  const isChatExpired = (type, createdAt) => {
    const now = Date.now();

    const oneDay = 24 * 60 * 60 * 1000;
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    let expirationTime;

    if (type === "temporary") {
      expirationTime = oneDay;
    } else if (type === "permanent") {
      expirationTime = sevenDays;
    }

    const expiresAt = createdAt + expirationTime;

    if (now > expiresAt) {
      setIsExpired(true);
    } else {
      setIsExpired(false);
    }
  };

  const onSend = async (messages = []) => {
    if (isExpired) return;
    const modifiedMessage = {
      ...messages[0],
      user: {
        ...messages[0].user,
        _id: `${mobileNum}`,
        name: `${username}`,
      },
      status: "sent",
    };

    if (chatType == "single") {
      modifiedMessage.createdAt = Date.now();

      const message = {
        type: "send_message",
        request_id: roomId.toString(),
        content: modifiedMessage,
        user_number: mobileNum,
      };
      const payload = {
        roomId: roomId,
        content: messages[0],
        translatedContent: messages[0],
        chatType: "single",
      };
      await dispatch(saveMessage(payload));
      setClearInput(true);
      if (socketActive === "inactive") {
        await dispatch(updateQueuedMessage({ message, payload }));
      } else {
        socket.send(JSON.stringify(message));
      }
    }
    if (chatType == "group") {
      modifiedMessage.createdAt = Date.now();
      const message = {
        type: "send_group_message",
        group_id: roomId.toString(),
        content: modifiedMessage,
        user_number: mobileNum,
      };
      const payload = {
        roomId: roomId,
        content: messages[0],
        translatedContent: messages[0],
        chatType: "group",
      };
      await dispatch(saveMessage(payload));
      setClearInput(true);
      if (socketActive === "inactive") {
        await dispatch(updateQueuedMessage({ message, payload }));
      } else {
        socket.send(JSON.stringify(message));
      }
    }
  };
  return (
    <React.Fragment>
      <View style={styles.chatContainer}>
        <View style={styles.chatNavBar}>
          <TouchableOpacity
            onPress={() => {
              setChatData([]);
              setMessages([]);
              if (!socket) return;
              const activePayload = {
                type: "chat_active",
                roomId,
                chatType,
                active: "false",
              };

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
              <Text style={styles.chatName}>
                {activeChat.username?.length > 10
                  ? `${activeChat.username.slice(0, 10)}...`
                  : activeChat?.username}
              </Text>
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
        </View>
        {isExpired && (
          <View style={styles.expiredBar}>
            <Text style={styles.offlineText}>
              Chat Expired. You won't be able to send messages.
            </Text>
          </View>
        )}
        {!isOnline && (
          <View style={styles.offlineBar}>
            <Text style={styles.offlineText}>
              You are offline. Messages will be sent when you're back online.
            </Text>
          </View>
        )}
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
        <InAppNotification />
      </View>
    </React.Fragment>
  );
};

export default Chat;
