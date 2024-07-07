import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsPage = () => {
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [language, setLanguage] = useState("");
  const [isPrivacyCollapsed, setIsPrivacyCollapsed] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      const storedMobileNumber = await AsyncStorage.getItem("mobileNumber");
      const storedLanguage = await AsyncStorage.getItem("language");

      setUsername(storedUsername || "");
      setMobileNumber(storedMobileNumber || "");
      setLanguage(storedLanguage || "");
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.settings}>
      <View style={styles.settingsSection}>
        <Text style={styles.settingsSectionTitle}>Profile</Text>
        <View style={styles.item}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{username}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Mobile Number:</Text>
          <Text style={styles.value}>{mobileNumber}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Language:</Text>
          <Text style={styles.value}>{language}</Text>
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsSectionTitle}>Privacy</Text>
        <TouchableOpacity
          style={styles.settingsAccordionHeader}
          onPress={() => setIsPrivacyCollapsed(!isPrivacyCollapsed)}
        >
          <Text style={styles.settingsAccordionHeaderText}>
            Terms and Conditions
          </Text>
        </TouchableOpacity>
        {/* <Collapsible collapsed={isPrivacyCollapsed}>
          <View style={styles.accordionContent}>
            <Text style={styles.accordionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
        </Collapsible> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    backgroundColor: "#fff",
  },
  settingsSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  settingsSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
  settingsAccordionHeader: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  settingsAccordionHeaderText: {
    fontSize: 16,
    color: "#333",
  },
  accordionContent: {
    paddingVertical: 12,
  },
  accordionText: {
    fontSize: 14,
    color: "#666",
  },
});

export default SettingsPage;
