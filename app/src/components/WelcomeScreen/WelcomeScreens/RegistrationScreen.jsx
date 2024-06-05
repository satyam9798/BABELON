import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import images from "../../../../constants/images";
import styles from "../../../../styles/pages.style";
import { verifyMobileNumber } from "../../../AppNavigator/services/apiServices";
import { Dropdown } from "react-native-element-dropdown";
import { LinearGradient } from "expo-linear-gradient";

const countryCode = [
  { label: "+91", value: "+91" },
  { label: "+1", value: "+1" },
  { label: "+49", value: "+49" },
  { label: "+81", value: "+81" },
];

const RegistrationScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [code, setCode] = useState(null);

  const isDisabled = () => {
    if (input.length == 10 && code) {
      return false;
    }
    return true;
  };

  const nextScreen = async () => {
    const payload = {
      mobile: input,
    };
    await verifyMobileNumber(payload)
      .then((response) => {
        const jsonResponse = response.json();
        if (response.ok) {
          navigation.navigate("otpverify", { mobileNum: input });
        } else {
          if (response.status == 409) {
            // handle auto login if registered(required in later phase)
            // navigation.navigate("main");
            navigation.navigate("otpverify", { mobileNum: input });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
          <View style={[styles.regContainer]}>
            <View style={styles.landingBack}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("LandingScreen");
                }}
              >
                <Image style={styles.backIcon} source={images.LeftArrowIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.regBodyContainer}>
              <Text style={styles.regSmHeader}>Enter your Mobile Number</Text>
              <Text style={styles.regText}>
                BabelON will need to verify your {"\n"} mobile number
              </Text>
            </View>
            <View style={styles.regInpCont}>
              <View style={styles.RegInput}>
                <View style={styles.regDropdownContainer}>
                  <Dropdown
                    style={[
                      styles.regDropdown,
                      isFocus && { borderColor: "blue" },
                    ]}
                    placeholderStyle={styles.regPlaceholderStyle}
                    selectedTextStyle={styles.regSelectedTextStyle}
                    inputSearchStyle={styles.regInputSearchStyle}
                    iconStyle={styles.regIconStyle}
                    data={countryCode}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? "   +   " : "  ...  "}
                    searchPlaceholder="Search"
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                      setCode(item.value);
                      setIsFocus(false);
                    }}
                  />
                </View>
                <TextInput
                  inputMode="numeric"
                  placeholder="Enter mobile number"
                  style={styles.RegTextInput}
                  onChangeText={(text) => setInput(text)}
                  value={input}
                  maxLength={10}
                />
              </View>
            </View>

            <TouchableOpacity
              style={isDisabled() ? styles.disabledRegBtn : styles.RegBtn}
              onPress={nextScreen}
              disabled={isDisabled()}
            >
              <Text style={styles.RegBtnText}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default RegistrationScreen;
