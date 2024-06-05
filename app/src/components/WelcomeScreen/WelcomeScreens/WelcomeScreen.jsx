import React, { useEffect } from "react";
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "../../../../styles/pages.style";
import images from "../../../../constants/images";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

export const handleUrl = (url) => {};
const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    userDetails();
  });
  const userDetails = async () => {
    const asyncUsername = await AsyncStorage.getItem("username");
    const asyncLanguage = await AsyncStorage.getItem("language");
    const asyncMobileNum = await AsyncStorage.getItem("mobileNum");
    const webToken = await AsyncStorage.getItem("websocket_token");
    if (!asyncLanguage || !asyncMobileNum || !asyncUsername || !webToken) {
      navigator.navigate("WelcomeScreen");
    } else {
      navigation.navigate("main");
    }
  };

  const nextScreen = () => {
    navigation.navigate("LandingScreen");
  };
  return (
    <SafeAreaView>
      <ImageBackground
        source={images.Welcomebanner}
        resizeMode="cover"
        style={styles.container}
      >
        <LinearGradient
          colors={["#373540", "#23202c"]}
          locations={[0.5, 0.8]}
          style={[styles.container, styles.bgOpacity]}
        >
          <View style={[styles.textContainer, styles.marginStyle]}>
            <Text style={styles.welcomeText}>
              Welcome to <Text style={styles.welcomeHeader}>Babel ON</Text>,
              Your {"\n"} Multilingual Chat Companion
            </Text>
            <Text style={styles.wlcmTxtBottom}>
              Explore a World of Multilingual{"\n"} Conversations!
            </Text>
          </View>
          <TouchableOpacity style={styles.wlcmBtn} onPress={nextScreen}>
            <Text style={styles.wlcmBtnText}>Get Started</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default WelcomeScreen;
