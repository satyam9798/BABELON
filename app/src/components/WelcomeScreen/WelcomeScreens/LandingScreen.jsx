import React from "react";
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
import { LinearGradient } from "expo-linear-gradient";

const LandingScreen = ({ navigation }) => {
  const nextScreen = async () => {
    navigation.navigate("RegistrationScreen");
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={images.LandingBanner}
        resizeMode="cover"
        style={styles.container}
      >
        <LinearGradient
          colors={["#373540", "#23202c"]}
          locations={[0.5, 0.8]}
          style={[styles.container, styles.bgOpacity]}
        >
          <View style={styles.landingBack}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("WelcomeScreen");
              }}
            >
              <Image style={styles.backIcon} source={images.LeftArrowIcon} />
            </TouchableOpacity>
          </View>
          <View style={[styles.textContainer, styles.marginStyleLandingPage]}>
            <Text style={styles.landingScreenText}>
              Start Conversing {"\n"} Across{" "}
              <Text style={styles.welcomeHeader}>Languages{"\n"}</Text>
              Seamslessly
            </Text>
          </View>
          <TouchableOpacity style={styles.LandBtn} onPress={nextScreen}>
            <Image style={styles.rightArrow} source={images.PlayIcon} />
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default LandingScreen;
