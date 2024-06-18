import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import styles from "../../../styles/pages.style";
import images from "../../../constants/images";
import {
  verifyMobileOTP,
  verifyMobileNumber,
} from "../../AppNavigator/services/apiServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../../constants/theme";

const VerificationPage = ({ navigation, route }) => {
  const [input_1, setInput_1] = useState("");
  const [input_2, setInput_2] = useState("");
  const [input_3, setInput_3] = useState("");
  const [input_4, setInput_4] = useState("");
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);

  const [isOTPResnt, setIsOTPResent] = useState(false);

  const { mobileNum } = route?.params;
  const [token, setToken] = useState();
  const focusNextInput = (nextInputRef) => {
    if (nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };
  const handleKeyPress = (event, ref) => {
    if (
      event.nativeEvent.key === "Backspace" &&
      ref.current === input4Ref.current
    ) {
      input3Ref.current.focus();
    } else if (
      event.nativeEvent.key === "Backspace" &&
      ref.current === input3Ref.current
    ) {
      input2Ref.current.focus();
    } else if (
      event.nativeEvent.key === "Backspace" &&
      ref.current === input2Ref.current
    ) {
      input1Ref.current.focus();
    }
  };

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
    const otp = input_1 + input_2 + input_3 + input_4;
    const payload = {
      mobile: mobileNum,
      otp: otp,
    };
    verifyMobileOTP(payload)
      .then((response) => {
        if (response.status == 200) {
          response.json().then((body) => {
            console.log(body);
            setToken(body.access);
            storeData(body);
            navigation.navigate("language", {
              access: body.access,
              mobile: mobileNum,
            });
          });
        } else {
        }
      })
      .catch((error) => {
        console.error("Otp verification failed", error);
      });
  };

  async function storeData(data) {
    try {
      if (data) {
        await AsyncStorage.setItem("access", data.access);
        await AsyncStorage.setItem("websocket_token", data.websocket_token);
        await AsyncStorage.setItem("mobileNum", mobileNum);
      }
      const asyncUsername = await AsyncStorage.getItem("username");
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

    input1Ref.current.clear();
    input2Ref.current.clear();
    input3Ref.current.clear();
    input4Ref.current.clear();
    setInput_1("");
    setInput_2("");
    setInput_3("");
    setInput_4("");
    setMinutes(1);
    setSeconds(59);
  };

  const isDisabled = () => {
    if (!input_1 || !input_2 || !input_3 || !input_4) {
      return true;
    }
    return false;
  };

  const number = mobileNum;
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
                  navigation.navigate("RegistrationScreen");
                }}
              >
                <Image style={styles.backIcon} source={images.LeftArrowIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.regSmHeader}>
                Enter Your {"\n"} Verification code
              </Text>
              {isOTPResnt ? (
                <Text style={styles.regText}>
                  We have resent you an one Time {"\n"} Passcode on{" "}
                  <Text style={{ color: COLORS.orangeCol }}>{number}</Text>
                </Text>
              ) : (
                <Text style={styles.regText}>
                  Please provide one time passcode sent on{" "}
                  <Text style={{ color: COLORS.orangeCol }}>{number}</Text>
                </Text>
              )}

              <View style={styles.otpInputWrapper}>
                <TextInput
                  style={styles.otpInputBox}
                  onChangeText={(text) => {
                    setInput_1(text);
                    if (text.length === 1) {
                      focusNextInput(input2Ref);
                    }
                  }}
                  onKeyPress={(event) => handleKeyPress(event, input1Ref)}
                  inputMode="numeric"
                  maxLength={1}
                  ref={input1Ref}
                />
                <TextInput
                  style={styles.otpInputBox}
                  onKeyPress={(event) => handleKeyPress(event, input2Ref)}
                  inputMode="numeric"
                  maxLength={1}
                  ref={input2Ref}
                  onChangeText={(text) => {
                    setInput_2(text);
                    if (text.length === 1) {
                      focusNextInput(input3Ref);
                    }
                  }}
                />
                <TextInput
                  style={styles.otpInputBox}
                  onKeyPress={(event) => handleKeyPress(event, input3Ref)}
                  inputMode="numeric"
                  maxLength={1}
                  ref={input3Ref}
                  onChangeText={(text) => {
                    setInput_3(text);
                    if (text.length === 1) {
                      focusNextInput(input4Ref);
                    }
                  }}
                />
                <TextInput
                  style={styles.otpInputBox}
                  onKeyPress={(event) => handleKeyPress(event, input4Ref)}
                  inputMode="numeric"
                  maxLength={1}
                  ref={input4Ref}
                  onChangeText={(text) => {
                    setInput_4(text);
                  }}
                />
              </View>
              <View style={styles.timer}>
                {(seconds > 0 || minutes > 0) && (
                  <Text style={styles.timerText}>
                    {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={isDisabled() ? styles.disabledBtn : styles.verifyOtpBtn}
                onPress={nextScreen}
                disabled={isDisabled()}
              >
                <Text style={styles.RegBtnText}>Verify OTP</Text>
              </TouchableOpacity>
              {seconds === 0 && minutes === 0 && (
                <View style={styles.resendOTP}>
                  <Text>Didn't recieve code? </Text>
                  <TouchableOpacity>
                    <Text
                      disabled={seconds > 0 || minutes > 0}
                      style={{
                        color:
                          seconds > 0 || minutes > 0
                            ? "white"
                            : COLORS.orangeCol,
                      }}
                      onPress={resendOTP}
                    >
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default VerificationPage;
