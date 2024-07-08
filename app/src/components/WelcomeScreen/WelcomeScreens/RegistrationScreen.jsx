import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import images from "../../../../constants/images";
// import styles from "../../../../styles/pages.style";
import styles from "../../../../styles/index.styles";
import { verifyMobileNumber } from "../../../AppNavigator/services/apiServices";
// import { Dropdown } from "react-native-element-dropdown";
import CountryPicker from "react-native-country-picker-modal";
// import { LinearGradient } from "expo-linear-gradient";
import AnimatedLoader from "react-native-animated-loader";

// const countryCode = [
//   { label: "+91", value: "+91" },
//   { label: "+1", value: "+1" },
//   { label: "+49", value: "+49" },
//   { label: "+81", value: "+81" },
// ];

const RegistrationScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(null);
  const [countryCode, setCountryCode] = useState("IN");
  const [country, setCountry] = useState(null);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const isDisabled = () => {
    if (input.length == 10 && countryCode) {
      return false;
    }
    return true;
  };

  const nextScreen = async () => {
    setIsLoading(true);
    const payload = {
      mobile: input,
    };
    await verifyMobileNumber(payload)
      .then((response) => {
        const jsonResponse = response.json();
        setIsLoading(false);
        if (response.ok) {
          navigation.navigate("otpverify", { mobileNum: input });
        } else {
          if (response.status == 409) {
            navigation.navigate("otpverify", { mobileNum: input });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
    //       <View style={[styles.regContainer]}>
    //         <View style={styles.landingBack}>
    //           <TouchableOpacity
    //             onPress={() => {
    //               navigation.navigate("LandingScreen");
    //             }}
    //           >
    //             <Image style={styles.backIcon} source={images.LeftArrowIcon} />
    //           </TouchableOpacity>
    //         </View>

    //         <View style={styles.regBodyContainer}>
    //           <Text style={styles.regSmHeader}>Enter your Mobile Number</Text>
    //           <Text style={styles.regText}>
    //             BabelON will need to verify your {"\n"} mobile number
    //           </Text>
    //         </View>
    //         <View style={styles.regInpCont}>
    //           <View style={styles.RegInput}>
    //             <View style={styles.regDropdownContainer}>
    //               <Dropdown
    //                 style={[
    //                   styles.regDropdown,
    //                   isFocus && { borderColor: "blue" },
    //                 ]}
    //                 placeholderStyle={styles.regPlaceholderStyle}
    //                 selectedTextStyle={styles.regSelectedTextStyle}
    //                 inputSearchStyle={styles.regInputSearchStyle}
    //                 iconStyle={styles.regIconStyle}
    //                 data={countryCode}
    //                 search
    //                 maxHeight={300}
    //                 labelField="label"
    //                 valueField="value"
    //                 placeholder={!isFocus ? "   +   " : "  ...  "}
    //                 searchPlaceholder="Search"
    //                 value={value}
    //                 onFocus={() => setIsFocus(true)}
    //                 onBlur={() => setIsFocus(false)}
    //                 onChange={(item) => {
    //                   setCode(item.value);
    //                   setIsFocus(false);
    //                 }}
    //               />
    //             </View>
    //             <TextInput
    //               inputMode="numeric"
    //               placeholder="Enter mobile number"
    //               style={styles.RegTextInput}
    //               onChangeText={(text) => setInput(text)}
    //               value={input}
    //               maxLength={10}
    //             />
    //           </View>
    //         </View>

    //         <TouchableOpacity
    //           style={isDisabled() ? styles.disabledRegBtn : styles.RegBtn}
    //           onPress={nextScreen}
    //           disabled={isDisabled()}
    //         >
    //           <Text style={styles.RegBtnText}>Send OTP</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </LinearGradient>
    //   </ImageBackground>
    // </SafeAreaView>
    <View style={styles.container}>
      <View style={styles.landingBack}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("WelcomeScreen");
          }}
        >
          <Image style={styles.backIcon} source={images.LeftArrowBlackIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.iconGroup}>
        <Image style={styles.registrationIcon} source={images.Earth} />
        <Image style={styles.registrationIcon} source={images.Welcomebanner} />
        <Image style={styles.registrationIcon} source={images.People} />
      </View>
      <Text style={styles.header}>Connect Beyond Borders</Text>
      <Text style={{ marginBottom: 20 }}>
        Enter your mobile number to get started
      </Text>

      <View style={styles.phoneNumberContainer}>
        <CountryPicker
          {...{
            countryCode,
            onSelect,
          }}
          withFlag
          withCallingCode
          withFilter
          withModal
          containerButtonStyle={styles.countryPicker}
        />
        <TextInput
          style={styles.inputPhone}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          value={input}
          onChangeText={(text) => setInput(text)}
          maxLength={10}
        />
      </View>

      {/* <View style={styles.resendContainer}>
        <TouchableOpacity style={styles.resendButton} onPress={handleResendOTP}>
    <Text style={styles.resendButtonText}>Resend OTP</Text>
    </TouchableOpacity>
    </View> */}
      {isLoading && <ActivityIndicator size="large" color="#ef8354" />}
      <TouchableOpacity
        style={isDisabled() ? styles.disabledButton : styles.button}
        disabled={isDisabled() || isLoading}
        onPress={nextScreen}
      >
        <Text style={styles.buttonText}>
          Register
          {/* <ActivityIndicator /> */}
          {/* <ActivityIndicator size="large" /> */}
          {/* <ActivityIndicator size="large" color="#00ff00" /> */}
        </Text>
      </TouchableOpacity>
      {/* <Toast /> */}
    </View>
  );
};
export default RegistrationScreen;
