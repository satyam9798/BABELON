import React, { useEffect } from "react";
import {
  ImageBackground,
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
// import styles from "../../../../styles/pages.style";
import styles from "../../../../styles/index.styles";

import images from "../../../../constants/images";
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
  };

  const nextScreen = () => {
    // navigation.navigate("LandingScreen");
    navigation.navigate("RegistrationScreen");
  };
  return (
    // <SafeAreaView>
    //   <ImageBackground
    //     source={images.Welcomebanner}
    //     resizeMode="cover"
    //     style={styles.container}
    //   >
    //     <LinearGradient
    //       colors={["#373540", "#23202c"]}
    //       locations={[0.5, 0.8]}
    //       style={[styles.container, styles.bgOpacity]}
    //     >
    //       <View style={[styles.textContainer, styles.marginStyle]}>
    //         <Text style={styles.welcomeText}>
    //           Welcome to <Text style={styles.welcomeHeader}>Babel ON</Text>,
    //           Your {"\n"} Multilingual Chat Companion
    //         </Text>
    //         <Text style={styles.wlcmTxtBottom}>
    //           Explore a World of Multilingual{"\n"} Conversations!
    //         </Text>
    //       </View>
    //       <TouchableOpacity style={styles.wlcmBtn} onPress={nextScreen}>
    //         <Text style={styles.wlcmBtnText}>Get Started</Text>
    //       </TouchableOpacity>
    //     </LinearGradient>
    //   </ImageBackground>
    // </SafeAreaView>
    <View style={styles.banner}>
      {/* <Icon name="language" size={100} color="#000" /> */}
      <Image style={styles.welcomeBanner} source={images.Welcomebanner} />
      <Text style={styles.title}>Welcome to Babel-on</Text>
      <Text style={styles.subtitle}>
        Communicate with anyone, in any language
      </Text>
      <TouchableOpacity style={styles.button} onPress={nextScreen}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};
export default WelcomeScreen;
