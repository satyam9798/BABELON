import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import ChatScene from "./ChatScene";
import styles from "../../../styles/index.styles";
import images from "../../../constants/images";
import CreateChatModal from "../modal/CreateChatModal";
import { getAsyncDetails } from "../../store/asyncSlice";

import { useFocusEffect } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";
import { retreiveData } from "../../store/dataSlice";
import { WebSocketContext } from "../../context/socketProvider";

const MainScreen = ({ navigation }) => {
  const socket = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.chatDataSlice);
  const [data, setData] = useState();
  const [showCreateLinkModal, setShowCreateLinkModal] = useState(false);
  const [chatFilter, setChatFilter] = useState("all");
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
  const HandleFilterChange = (filter) => {
    setChatFilter(filter);
    // console.log("data", userData);
    const parsedData = JSON.parse(userData);
    // console.log(parsedData["group"]);
    if (userData && userData.length >= 1) {
      if (filter === "all") {
        const parsedData = JSON.parse(userData);
        const allChats = Object.values(parsedData).flatMap((chatType) =>
          Array.isArray(chatType) ? chatType : []
        );
        setData(allChats);
      } else if (filter === "individual") {
        const parsedData = JSON.parse(userData);
        const allChats = parsedData["single"];
        setData(allChats);
      } else if (filter === "group") {
        const parsedData = JSON.parse(userData);
        const allChats = parsedData["group"];
        setData(allChats);
      }
    }
  };

  return (
    // <SafeAreaView>
    //   <ImageBackground
    //     source={images.BackgroundImage}
    //     resizeMode="cover"
    //     style={styles.container}
    //   >
    //     <LinearGradient
    //       colors={["#373540", "#23202c"]}
    //       locations={[0.5, 0.8]}
    //       style={[styles.container, styles.bgOpacity]}
    //     >
    <View style={[styles.mainContainer, styles.bgOpacity]}>
      <View style={styles.MainNavbar}>
        <View>
          <Text style={styles.NavbarText}>Chats</Text>
        </View>
      </View>
      <View style={styles.MainSearchInput}>
        <TextInput
          inputMode="text"
          placeholder="Search"
          style={styles.searchInput}
          onChangeText={(text) => HandleSearch(text)}
        />
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => HandleFilterChange("all")}>
          <Text
            style={[
              styles.filterText,
              chatFilter === "all" && styles.filterTextSelected,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => HandleFilterChange("individual")}>
          <Text
            style={[
              styles.filterText,
              chatFilter === "individual" && styles.filterTextSelected,
            ]}
          >
            Individual
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => HandleFilterChange("group")}>
          <Text
            style={[
              styles.filterText,
              chatFilter === "group" && styles.filterTextSelected,
            ]}
          >
            Group
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <ChatScene data={data} navigation={navigation} />
      </View>
      {showCreateLinkModal && (
        <>
          <CreateChatModal
            closeModal={CloseChatHandle}
            navigation={navigation}
          />
        </>
      )}
      <TouchableOpacity style={styles.newChatButton} onPress={CreateChatHandle}>
        <Image style={styles.plusIcon} source={images.Pencil} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => {
          navigation.navigate("settings");
        }}
      >
        <Image style={styles.plusIcon} source={images.Settings} />
      </TouchableOpacity>
    </View>
    // {/* <SocketEventHandler /> */}
    //     </LinearGradient>
    //   </ImageBackground>
    // </SafeAreaView>
  );
};

export default MainScreen;
