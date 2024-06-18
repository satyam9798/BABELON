import AsyncStorage from "@react-native-async-storage/async-storage";
import images from "../../constants/images";

export const chatData = [];
export let data = null;
const getData = async () => {
  const tempData = await AsyncStorage.getItem("userData");
  return JSON.parse(tempData);
};
const initializeData = async () => {
  data = await getData();
};
export const exportData = async () => {
  await initializeData();
  return data;
};
export const addNewChat = async (fnData) => {
  try {
    const existingData = await AsyncStorage.getItem("userData");
    let userData = [];
    if (existingData) {
      userData = JSON.parse(existingData);
    }
    userData.unshift(fnData);
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
  } catch (error) {
    console.error("Error appending data:", error);
  }
};
export const editChatData = async (roomId, newMessage) => {
  try {
    const existingData = await AsyncStorage.getItem("userData");
    if (!existingData) {
      console.error("No existing data found");
      return;
    }
    let userData = JSON.parse(existingData);
    const index = userData.findIndex((item) => item.roomId === roomId);
    if (index === -1) {
      console.error("No object found with the given roomId");
      return;
    }
    userData[index].msg.push(newMessage);
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    initializeData();
  } catch (error) {
    console.error("Error editing data:", error);
  }
};
const addUser = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

const removeUser = async (key) => {
  await AsyncStorage.removeItem(key);
};

export const userListHandler = ({
  roomId,
  displayPicture = images.verifyOTP,
  username,
  msg,
  timestamp,
}) => {
  if (chatData.length < 10 && chatData.length > 0) {
    chatData.unshift({
      roomId: roomId,
      displayPicture: displayPicture,
      username: username,
      msg: msg,
      timestamp: timestamp,
    });

    addUser(chatData[0].roomId, chatData[0].username);
  } else {
    const lastUser = chatData.pop();
    removeUser(lastUser.roomId);

    chatData.unshift({
      roomId: roomId,
      displayPicture: displayPicture,
      username: username,
      msg: msg,
      timestamp: timestamp,
    });

    addUser(chatData[0].roomId, chatData[0].username);
  }
};