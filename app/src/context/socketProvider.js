import React, { createContext, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAsyncDetails } from "../store/asyncSlice";
import { retreiveData, saveMessage, saveGroupMembers, updateGroupDetails } from "../store/dataSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ReconnectingWebSocket from "reconnecting-websocket";

const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  const navigation = useNavigation();
  const ws = useRef(null);
  const dispatch = useDispatch();
  const { language, mobileNum, websocketToken } = useSelector((state) => state.asyncDataSlice);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    console.log(language, mobileNum, websocketToken);
    if (language != null && mobileNum != null && websocketToken != null) {
      connectWebSocket();
    }
  }, [language, mobileNum, websocketToken]);

  // useEffect(() => {
  //   dispatch(getAsyncDetails());
  //   return () => {
  //     console.log("Unmouting web socket");
  //     // if (socket) {
  //     ws.current.close();
  //     // }
  //   };
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAsyncDetails());
      return () => {
        console.log("Unmouting web socket");
        // if (socket) {
        ws.current.close();
        // }
      };
    }, [])
  );
  const connectWebSocket = async () => {
    const asyncUsername = await AsyncStorage.getItem("username");
    const asyncLanguage = await AsyncStorage.getItem("language");
    const asyncMobileNum = await AsyncStorage.getItem("mobileNum");

    const options = {
      connectionTimeout: 5000,
      maxRetries: 10,
      debug: true,
    };
    ws.current = new ReconnectingWebSocket(
      encodeURI(
        "wss://bableon-django-1193e2d277c3.herokuapp.com/ws/" +
        asyncMobileNum +
        "/?lang=" +
        asyncLanguage
      ), [], options
    );
    setSocket(ws.current);
    const webToken = await AsyncStorage.getItem("websocket_token");
    console.log("connecting to websocket", ws.current);
    ws.current.onopen = () => {
      const initiateSocket = {
        type: "token",
        content: webToken,
      };
      sendData(JSON.stringify(initiateSocket));
      if (ws.current.readyState === WebSocket.OPEN) {
      }
      const getChats = {
        type: "get_chats",
      };
      sendData(JSON.stringify(getChats));
      const checkMsg = {
        type: "check_messages",
      };
      sendData(JSON.stringify(checkMsg));
    };
    ws.current.onclose = (e) => {
      console.warn("web socket connection closed", e);
    };
    ws.current.onerror = (e) => {
      console.warn("web socket error occured", e);
    };
    ws.current.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      console.log("msg", msg)
      if (msg?.type == "invalid_user") {
      }
      if (msg?.type == "token") {
        // handle token messages
      } else if (msg?.type == "user_chats") {
        // handle members in a group
        if (!isObjectEmpty(msg?.message.groups)) {
          dispatch(saveGroupMembers(msg?.message.groups));
        }

      }
      else if (msg?.type == "group_details_update") {
        // handle details update in a group
        console.log("updated details", msg?.message);
        dispatch(updateGroupDetails(msg?.message));

      } else if (msg?.type == "message") {
        if (msg?.message?.request_id) {
          const payload = {
            roomId: msg.message?.request_id,
            translatedContent: msg.message?.content,
            content: msg.message?.translated_content,
            chatType: "single",
            username: msg.message?.from_username,
          };
          dispatch(saveMessage(payload));
        } else if (msg?.message?.group_id) {
          if (msg?.message.from == mobileNum) {
            // ignoring own messages
          } else {
            const payload = {
              roomId: msg.message?.group_id,
              translatedContent: msg.message?.content,
              content: msg.message?.translated_content,
              chatType: "group",
            };
            dispatch(saveMessage(payload));
          }
        }
      }
    };
  };
  const sendData = (data) => {
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(data);
    } else {
    }
  };
  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  return (
    <WebSocketContext.Provider value={ws.current}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketContext, WebSocketProvider };
