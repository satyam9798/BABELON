import React, { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import images from "../../../constants/images";
import styles from "../../../styles/pages.style";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUsernameAndLang } from "../../AppNavigator/services/apiServices";
import { Dropdown } from "react-native-element-dropdown";
import { getAsyncDetails, handleUserDetails } from "../../store/asyncSlice";

import { useSelector, useDispatch } from "react-redux";

const languages = [
  { label: "Assamese", value: "as" },
  { label: "Bengali", value: "bn" },
  { label: "English", value: "en" },
  { label: "Gujarati", value: "gu" },
  { label: "Hindi", value: "hi" },
  { label: "Kannada", value: "kn" },
  { label: "Malayalam", value: "ml" },
  { label: "Marathi", value: "mr" },
  { label: "Odia (Oriya)", value: "or" },
  { label: "Punjabi (Gurmukhi)", value: "pa" },
  { label: "Tamil", value: "ta" },
  { label: "Telugu", value: "te" },
  { label: "Urdu", value: "ur" },
];

const ChooseLanguage = ({ navigation, route }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("Error Occured");
  const [userName, setuserName] = useState("");
  const [language, setlanguage] = useState("");
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const { access, mobile } = route?.params;
  const dispatch = useDispatch();

  retrieveData();
  const nextScreen = () => {
    const postData = {
      username: userName,
      ssoToken: access,
    };
    setUsernameAndLang(postData)
      .then(async (response) => {
        if (response.ok) {
          await storeData(userName, language);
          navigation.navigate("main");
        } else {
          setToastMsg("Username already exists");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        }
      })
      .catch((error) => console.error("please try again", error));
  };
  async function retrieveData() {
    try {
      const ssoToken = await AsyncStorage.getItem("access");
      if (ssoToken !== null) {
        return ssoToken;
      } else {
      }
    } catch (error) {
      console.error("Failed to retrieve SSO token:", error);
    }
  }

  async function storeData(username, language) {
    try {
      const payload = {
        username,
        language,
        mobile,
      };
      dispatch(handleUserDetails(payload));
    } catch (error) {
      console.error("Failed to store SSO token:", error);
    }
  }

  const isDisabled = () => {
    if (userName != "" && language != "") {
      return false;
    }
    return true;
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Languages
        </Text>
      );
    }
    return null;
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
          <View style={[styles.textContainer, styles.usernameBody]}>
            <Text style={styles.regSmHeader}>
              Select your{"\n"} Language and Username
            </Text>
            <View style={styles.languageContainer}>
              <Text style={styles.userNameHeader}>Language</Text>
              <View style={styles.dropdownContainer}>
                {/* {renderLabel()} */}
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={languages}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select language" : "..."}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setlanguage(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
            </View>
            <View style={styles.languageContainer}>
              <Text style={styles.userNameHeader}>Username</Text>
              <View style={styles.userNameInput}>
                <Image style={styles.usernameIcon} source={images.UserName} />
                <TextInput
                  style={styles.userNameTextInput}
                  onChangeText={(text) => setuserName(text)}
                  value={userName}
                  placeholder="Enter your username"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={
              isDisabled()
                ? styles.disabledUserNameBtn
                : styles.langConfirmationBtn
            }
            onPress={nextScreen}
          >
            <Text style={styles.RegBtnText}>Submit</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default ChooseLanguage;
