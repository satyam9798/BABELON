import React, { useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import { WebSocketContext } from "../../context/socketProvider";

const SocketEventHandler = () => {
  const navigation = useNavigation();
  const socket = useContext(WebSocketContext);
  useEffect(() => {
    const handleSocketClosed = () => {
      console.log("navigating to the reg screen bcoz of socket error");
      navigation.dispatch(StackActions.replace("RegistrationScreen"));
    };

    const handleSocketError = (error) => {
      console.error("Socket error:", error);
      console.log("navigating to the reg screen bcoz of socket error");

      navigation.dispatch(StackActions.replace("RegistrationScreen"));
    };

    if (socket && socket.readyState == 1) {
      socket.on("disconnect", handleSocketClosed);
      socket.on("error", handleSocketError);
      socket.on("close", handleSocketError);
    }

    return () => {};
  }, [navigation, socket]);

  return null; // This component doesn't render any UI
};

export default SocketEventHandler;
