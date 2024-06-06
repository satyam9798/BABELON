import React, {
  useCallback,
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
  useContext,
} from "react";
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
  TextInput,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Pressable,
} from "react-native";
import styles from "../../../styles/pages.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import images from "../../../constants/images";
import { addNewChat, exportData, editChatData } from "../../UserData/chatData";
import {
  acceptRequest,
  connectionStatus,
  acceptGroupRequest,
} from "../../AppNavigator/services/apiServices";
import Toast from "react-native-simple-toast";
import { useFocusEffect } from "@react-navigation/native";
import { WebSocketContext } from "../../context/socketProvider";
import {
  saveMessage,
  saveStatus,
  saveData,
  setActiveChat,
} from "../../store/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import { retreiveAsyncData } from "../../store/asyncSlice";
import { LinearGradient } from "expo-linear-gradient";
import CustomInputToolbar from "./CustomInputToolBar";

// const getRandomColor = () => {
//   const letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };

const Chat = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const socket = useContext(WebSocketContext);
  const { activeChat, userData } = useSelector((state) => state.chatDataSlice);
  const { mobileNum, username } = useSelector((state) => state.asyncDataSlice);
  const [clearInput, setClearInput] = useState(false);

  const { data, userType, roomId, chatType, linkType } = route?.params || "";
  const [chatData, setChatData] = useState(data);

  const [chatName, setChatName] = useState();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const maxCharacters = 180;

  const ws = useRef(null);

  useEffect(() => {
    handlelink();
  }, [roomId]);

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
        console.log("responce", response);
        if (response.ok) {
          response.json().then((body) => {
            console.log("request body of accept single chat", body);
            if (body.message == "Connection request accepted") {
              // setChatStatus(body.message);
              // setChatToken(body.web_token);
              // setIsChatDisabled(false);
              // setIsReloadDisabled(true);
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
                timestamp: formattedDate,
              };
              const payload = {
                roomId: roomId,
                chatStatus: body.message,
                chatType: chatType,
              };
              dispatch(saveData({ data: setData, chatType: chatType }));
              //   dispatch(saveStatus(payload));
              //   addNewChat(setData);
              //   setChatData(setData);
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
        // console.log("responce", response);
        if (response.ok) {
          response.json().then((body) => {
            console.log("request body of accept group chat", body);
            if (body.message == "Joined in the group") {
              //   setChatStatus(body.message);
              //   setChatToken(body.web_token);
              //   setIsChatDisabled(false);
              //   setIsReloadDisabled(true);
              const currentDate = new Date();
              const year = currentDate.getFullYear();
              const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because month starts from 0
              const day = String(currentDate.getDate()).padStart(2, "0");

              const formattedDate = `${year}-${month}-${day}`;
              const background =
                "#" + Math.floor(Math.random() * 16777215).toString(16);
              const setData = {
                roomId: roomId,
                userType: 2,
                chatType: chatType,
                linkType: linkType,
                chatStatus: body.message,
                chatToken: "",
                displayPicture: linkType,
                username: `group${roomId}`,
                msg: [],
                timestamp: formattedDate,
              };
              dispatch(saveData({ data: setData, chatType: chatType }));
              //   addNewChat(setData);
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
    }, [userData])
  );
  useFocusEffect(
    React.useCallback(() => {
      if (activeChat && activeChat.msg) {
        const sortedMessages = activeChat.msg.slice().sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        sortedMessages.map((item) => {
          console.log(item.createdAt);
        });
        setMessages(sortedMessages);
        setChatName(activeChat.username);
      }
    }, [activeChat])
  );
  useFocusEffect(
    React.useCallback(() => {
      dispatch(retreiveAsyncData());
      if (activeChat && activeChat.msg) {
        const sortedMessages = activeChat.msg.slice().sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setMessages(sortedMessages);
        setChatName(activeChat.username);
      }
    }, [])
  );

  useEffect(() => {
    console.log("clearonput", clearInput);
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
        chatType: "group",
      };
      dispatch(saveMessage(payload));
      setClearInput(true);
    }
  };
  const sortedMessages = messages.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return (
    <React.Fragment>
      <View style={styles.chatNavBar}>
        <TouchableOpacity
          onPress={() => {
            setChatData();
            navigation.navigate("main");
          }}
        >
          <Image style={styles.navBackIcon} source={images.LeftArrowIcon} />
        </TouchableOpacity>
        {activeChat && <Text>{activeChat.username}</Text>}
        {userType == 1 ? (
          <TouchableOpacity onPress={() => {}}></TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
      {userType && (
        <GiftedChat
          messagesContainerStyle={{
            backgroundColor: "white",
            height: "100%",
            paddingBottom: 70,
          }}
          // messageContainerStyle={{ backgroundColor: "blue" }}
          // renderChatFooter={null}
          renderUsernameOnMessage={true}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          showAvatarForEveryMessage={true}
          renderAvatar={null}
          // renderInputToolbar={(props) => customtInputToolbar(props)}
          renderBubble={(props, index) => customBubbleContainer(props, index)}
          //custom input bar with text count
          renderInputToolbar={(props) => (
            <CustomInputToolbar {...props} clearInput={clearInput} />
          )}
        />
      )}
    </React.Fragment>
  );
};

export default Chat;
