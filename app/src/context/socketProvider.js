import React, { createContext, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAsyncDetails } from "../store/asyncSlice";
import { saveMessage, saveGroupMembers, updateGroupDetails, saveSocketStatus } from "../store/dataSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import ReconnectingWebSocket from "reconnecting-websocket";

const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  const ws = useRef(null);
  const dispatch = useDispatch();
  const { language, mobileNum, websocketToken } = useSelector((state) => state.asyncDataSlice);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (language != null && mobileNum != null && websocketToken != null) {
      connectWebSocket();
    }
  }, [language, mobileNum, websocketToken]);
  let messageQueue = [];
  let isProcessing = false;




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
    const asyncLanguage = await AsyncStorage.getItem("language");
    const asyncMobileNum = await AsyncStorage.getItem("mobileNum");

    const options = {
      connectionTimeout: 12000,
      maxRetries: 10,
      debug: false,
    };
    ws.current = new ReconnectingWebSocket(
      encodeURI(
        "wss://babelonbe-asbcbvhmbhdsfgeg.eastus-01.azurewebsites.net/ws/" +
        asyncMobileNum +
        "/?lang=" +
        asyncLanguage
      ), [], options
    );

    setSocket(ws.current);
    ws.current.onopen = () => {
    };
    ws.current.onclose = (e) => {
      dispatch(saveSocketStatus({ status: "inactive" }))

      console.warn("web socket connection closed", e);
    };
    ws.current.onerror = (e) => {
      console.warn("web socket error occured", e);
    };
    ws.current.onmessage = async (e) => {
      const msg = JSON.parse(e.data);

      // Push all incoming messages to the queue
      messageQueue.push(msg);
      processMessageQueue();
    };
  };

  const processMessageQueue = async () => {
    if (isProcessing || messageQueue.length === 0) return;

    isProcessing = true;
    while (messageQueue.length > 0) {
      const msg = messageQueue.shift();

      try {
        await processMessageByType(msg);
      } catch (error) {
        console.error('Failed to process message:', error);
        messageQueue.unshift(msg); // Put the message back if processing failed
        break; // Exit loop and retry later
      }
    }
    isProcessing = false;
  };

  const processMessageByType = async (msg) => {
    switch (msg?.type) {
      case "invalid_user":
        break;

      case "token":
        if (msg?.message === 'accepted') {
          const fcmToken = await AsyncStorage.getItem("fcmToken");
          const fcmPayload = {
            type: "fcm_token",
            content: fcmToken,
          };
          sendData(JSON.stringify(fcmPayload));
          // if (ws.current.readyState === WebSocket.OPEN) {
          //   // Perform additional actions
          // }
          const getChats = {
            type: "get_chats",
          };
          sendData(JSON.stringify(getChats));

          const checkMsg = {
            type: "check_messages",
          };
          sendData(JSON.stringify(checkMsg));

          dispatch(saveSocketStatus({ status: "active" }));
        } else if (msg?.message === 'send_token') {
          const webToken = await AsyncStorage.getItem("websocket_token");
          const initiateSocket = {
            type: "token",
            content: webToken,
          };
          sendData(JSON.stringify(initiateSocket));
        }
        break;

      case "user_chats":
        if (!isObjectEmpty(msg?.message.groups)) {
          setTimeout(async () => {
            await dispatch(saveGroupMembers(msg?.message.groups));
          }, 1000);
        }
        break;

      case "group_details_update":
        await dispatch(updateGroupDetails(msg?.message));
        break;

      case "message":
        let payload;
        if (msg?.message?.request_id) {
          payload = {
            roomId: msg.message?.request_id,
            translatedContent: msg.message?.content,
            content: msg.message?.translated_content,
            chatType: "single",
            username: msg.message?.from_username,
          };
        } else if (msg?.message?.group_id && msg?.message.from !== mobileNum) {
          payload = {
            roomId: msg.message?.group_id,
            translatedContent: msg.message?.content,
            content: msg.message?.translated_content,
            chatType: "group",
          };
        }
        if (payload) {
          await dispatch(saveMessage(payload));
        }
        break;

      default:
        console.log(`Unhandled message type: ${msg?.type}`);
        break;
    }
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
