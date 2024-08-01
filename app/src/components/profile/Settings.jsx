import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import Collapsible from "react-native-collapsible";
import styles from "../../../styles/index.styles";
import images from "../../../constants/images";
import { useSelector } from "react-redux";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InAppNotification from "../modal/InAppNotification";

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

const SettingsPage = ({ navigation }) => {
  const [isPrivacyCollapsed, setIsPrivacyCollapsed] = useState(true);
  const { mobileNum, username, language } = useSelector(
    (state) => state.asyncDataSlice
  );
  //added for dev env for fcm token
  const [fcmToken, setFcmToken] = useState(null);
  useEffect(() => {
    getData();
  });
  const getData = async () => {
    await getFcmToken();
  };
  async function getFcmToken() {
    const data = await AsyncStorage.getItem("fcmToken");
    setFcmToken(data);
  }

  const getLanguageLabel = (value) => {
    const language = languages.find((lang) => lang.value === value);
    return language ? language.label : value;
  };

  return (
    <ScrollView style={styles.settings}>
      <View style={styles.settingsSection}>
        <View style={styles.settingsNavbar}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("main");
            }}
          >
            <Image
              style={styles.settingsBackIcon}
              source={images.LeftArrowIcon}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.settingsNavbarText}>Settings</Text>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.settingsProfile}>
            <View style={styles.settingsImageContainer}>
              <Image source={images.Single} style={styles.settingsImage} />
            </View>
            <View style={styles.settingsTextContainer}>
              <Text style={styles.settingsUsername}>{username}</Text>
              <Text style={styles.settingsMobileNumber}>{mobileNum}</Text>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.personalContainer}>
              <Text style={styles.sectionTitle}>Personal Details</Text>
              <TouchableOpacity>
                <Image source={images.Edit} style={styles.arrowIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Username:</Text>
              <Text style={styles.detailValue}>{username}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Mobile:</Text>
              <Text style={styles.detailValue}>{mobileNum}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>FCM Token:</Text>
              <TouchableOpacity
                onPress={async () => {
                  await Clipboard.setStringAsync(fcmToken);
                }}
              >
                <Text style={styles.detailValue}>{fcmToken}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Language:</Text>
              <Text style={styles.detailValue}>
                {getLanguageLabel(language)}
              </Text>
            </View>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => setIsPrivacyCollapsed(!isPrivacyCollapsed)}
              style={styles.collapsibleHeader}
            >
              <Text style={styles.sectionTitle}>Terms and Conditions</Text>
              <Image
                source={isPrivacyCollapsed ? images.ArrowDown : images.ArrowUp}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            <Collapsible collapsed={isPrivacyCollapsed}>
              <View style={styles.collapsibleContent}>
                <Text style={styles.privacyPoint}>
                  • All data is stored locally on your device, not on our
                  servers
                </Text>
                <Text style={styles.privacyPoint}>
                  • Regular security audits ensure your data remains safe
                </Text>
                <Text style={styles.privacyPoint}>
                  • You have full control over your data and can delete it at
                  any time
                </Text>
                <Text style={styles.privacyPoint}>
                  • We do not share your personal information with third parties
                </Text>
              </View>
            </Collapsible>
          </View>
        </View>
        <InAppNotification />
      </View>
    </ScrollView>
  );
};

export default SettingsPage;
