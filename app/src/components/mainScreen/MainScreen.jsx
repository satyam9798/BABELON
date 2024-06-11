import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import ChatScene from "./ChatScene";
import styles from "../../../styles/pages.style";
import images from "../../../constants/images";
import CreateChatModal from "../modal/CreateChatModal";
import { getAsyncDetails } from "../../store/asyncSlice";
import { LinearGradient } from "expo-linear-gradient";

import { useFocusEffect } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";
import { retreiveData } from "../../store/dataSlice";
import { WebSocketContext } from "../../context/socketProvider";

const MainScreen = ({ route, navigation }) => {
  const socket = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.chatDataSlice);
  const [data, setData] = useState();
  const [showCreateLinkModal, setShowCreateLinkModal] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAsyncDetails());
      dispatch(retreiveData({}));
    }, [socket])
  );

  useEffect(() => {
    if (userData && userData.length >= 1) {
      const parsedData = JSON.parse(userData);
      const allChats = Object.values(parsedData).flatMap((chatType) =>
        Array.isArray(chatType) ? chatType : []
      );
      setData(allChats);
    }
    // delete async data (needed in ENV="DEV" to clear values)
    // AsyncStorage.removeItem("userData");
  }, [userData]);

  const CreateChatHandle = () => {
    setShowCreateLinkModal(true);
  };
  const CloseChatHandle = () => {
    setShowCreateLinkModal(false);
  };
  const HandleSearch = (text) => {
    const parsedData = JSON.parse(userData);
    const allChats = Object.values(parsedData).flatMap((chatType) =>
      Array.isArray(chatType) ? chatType : []
    );
    if (text.length >= 1) {
      if (allChats && allChats.length >= 1) {
        const filterData = allChats.filter((item) =>
          item.username.toLowerCase().includes(text.toLowerCase())
        );

        setData(filterData);
      }
    } else {
      if (userData && userData.length >= 1) {
        const parsedData = JSON.parse(userData);
        const allChats = Object.values(parsedData).flatMap((chatType) =>
          Array.isArray(chatType) ? chatType : []
        );
        setData(allChats);
      }
    }
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={images.BackgroundImage}
        resizeMode="cover"
        style={styles.container}
      >
        <LinearGradient
          colors={["#373540", "#23202c"]}
          locations={[0.5, 0.8]}
          style={[styles.container, styles.bgOpacity]}
        >
          <View>
            <View style={styles.MainNavbar}>
              <View>
                <Text style={styles.NavbarText}>Chats</Text>
              </View>
              <View style={styles.NavbarIconTab}>
                <View style={styles.NavbarIcon}>
                  <TouchableOpacity onPress={CreateChatHandle}>
                    <Image style={styles.plusIcon} source={images.CreateIcon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.NavbarIcon}></View>
              </View>
            </View>
            <View style={styles.MainSearchInput}>
              <TextInput
                inputMode="text"
                placeholder="Search"
                style={styles.RegTextInput}
                onChangeText={(text) => HandleSearch(text)}
              />
            </View>
            {showCreateLinkModal && (
              <>
                <CreateChatModal
                  closeModal={CloseChatHandle}
                  navigation={navigation}
                />
              </>
            )}

            <ChatScene
              style={styles.ChatlistContainer}
              data={data}
              navigation={navigation}
            />
          </View>
          {/* <SocketEventHandler /> */}
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MainScreen;
