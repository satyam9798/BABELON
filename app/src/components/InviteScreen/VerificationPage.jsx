import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import styles from "../../../styles/index.styles";
import images from "../../../constants/images";
import {
  verifyMobileOTP,
  verifyMobileNumber,
} from "../../AppNavigator/services/apiServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../../constants/theme";
import { useSelector, useDispatch } from "react-redux";
import { getAsyncDetails, handleToken } from "../../store/asyncSlice";
import Toast from "react-native-simple-toast";

const VerificationPage = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
  const [otp, setOtp] = useState("");

  const [isOTPResnt, setIsOTPResent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // {route?.params ||}
  const { mobileNum } = route?.params || null;
  const [token, setToken] = useState();
  // const focusNextInput = (nextInputRef) => {
  //   if (nextInputRef.current) {
  //     nextInputRef.current.focus();
  //   }
  // };r
  // const handleKeyPress = (event, ref) => {
  //   if (
  //     event.nativeEvent.key === "Backspace" &&
  //     ref.current === input4Ref.current
  //   ) {
  //     input3Ref.current.focus();
  //   } else if (
  //     event.nativeEvent.key === "Backspace" &&
  //     ref.current === input3Ref.current
  //   ) {
  //     input2Ref.current.focus();
  //   } else if (
  //     event.nativeEvent.key === "Backspace" &&
  //     ref.current === input2Ref.current
  //   ) {
  //     input1Ref.current.focus();
  //   }
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const nextScreen = () => {
    // const inputOtp = input_1 + input_2 + input_3 + input_4;
    setIsLoading(true);
    const payload = {
      mobile: mobileNum,
      otp: otp,
    };
    verifyMobileOTP(payload)
      .then((response) => {
        setIsLoading(false);
        if (response.status == 200) {
          response.json().then(async (body) => {
            const oldMobile = await AsyncStorage.getItem("mobileNum");
            if (oldMobile != mobileNum) {
              await AsyncStorage.removeItem("userData");
              await AsyncStorage.removeItem("mobileNum");
              await AsyncStorage.removeItem("access");
              await AsyncStorage.removeItem("language");
              dispatch(getAsyncDetails());
            }
            setToken(body.access);
            storeData(body);

            navigation.navigate("language", {
              access: body.access,
              mobile: mobileNum,
            });
          });
        } else if (response.status == 400) {
          Toast.show("please register again");
          // navigation.navigate("RegistrationScreen");
        }
      })
      .catch((error) => {
        console.error("Otp verification failed", error);
      });
  };

  async function storeData(data) {
    try {
      if (data) {
        dispatch(
          handleToken({
            access: data.access,
            websocketToken: data.websocket_token,
            mobileNum,
          })
        );
        //   await AsyncStorage.setItem("access", data.access);
        //   await AsyncStorage.setItem("websocket_token", data.websocket_token);
        //   await AsyncStorage.setItem("mobileNum", mobileNum);
      }
      // const asyncUsername = await AsyncStorage.getItem("username");
    } catch (error) {
      console.error("Failed to store SSO token:", error);
    }
  }

  const resendOTP = () => {
    setIsOTPResent(true);

    const payload = {
      mobile: mobileNum,
    };

    verifyMobileNumber(payload)
      .then((response) => {})
      .catch((error) => console.error("please register again", error));

    // input1Ref.current.clear();
    // input2Ref.current.clear();
    // input3Ref.current.clear();
    // input4Ref.current.clear();
    // setInput_1("");
    // setInput_2("");
    // setInput_3("");
    // setInput_4("");
    setOtp("");
    setMinutes(1);
    setSeconds(59);
  };

  const isDisabled = () => {
    if (otp.length !== 4) {
      return true;
    }
    return false;
  };

  const number = mobileNum;
  return (
    <View style={styles.verifyContainer}>
      <View style={styles.landingBack}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RegistrationScreen");
          }}
        >
          <Image style={styles.backIcon} source={images.LeftArrowBlackIcon} />
        </TouchableOpacity>
      </View>
      {/* <Icon name="lock" size={50} color="#4C9A2A" style={styles.icon} /> */}
      <Image style={styles.registrationIcon} source={images.Otp} />
      <Text style={styles.verifyHeader}>Verify OTP</Text>
      <View style={styles.verifyTextContainer}>
        <Text style={styles.verifySubheader}>
          Enter the 4-digit code sent to you on {"\n"}
        </Text>
        <Text style={styles.verifyMobileText}>{mobileNum}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RegistrationScreen");
          }}
          style={styles.verifyMobileIncorrect}
        >
          <Text>Not your number?</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.inputOtp}
        placeholder="OTP"
        keyboardType="numeric"
        maxLength={4}
        value={otp}
        onChangeText={setOtp}
      />

      <View style={styles.timer}>
        {(seconds > 0 || minutes > 0) && (
          <Text style={styles.timerText}>
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        )}
      </View>
      {isLoading && <ActivityIndicator size="large" color="#ef8354" />}
      <TouchableOpacity
        style={isDisabled() ? styles.verifyDisabledButton : styles.verifyButton}
        disabled={isLoading || isDisabled()}
        onPress={nextScreen}
      >
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>

      {seconds === 0 && minutes === 0 && (
        <View style={styles.resendOTP}>
          <Text>Didn't recieve code? </Text>
          <TouchableOpacity>
            <Text
              disabled={seconds > 0 || minutes > 0}
              style={{
                color: seconds > 0 || minutes > 0 ? "white" : COLORS.orangeCol,
              }}
              onPress={resendOTP}
            >
              Resend OTP
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default VerificationPage;
