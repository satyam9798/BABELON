import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import styles from "../../../../styles/index.styles";

import images from "../../../../constants/images";

export const handleUrl = (url) => {};
const WelcomeScreen = ({ navigation }) => {
  const nextScreen = () => {
    navigation.navigate("RegistrationScreen");
  };
  return (
    <View style={styles.banner}>
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
