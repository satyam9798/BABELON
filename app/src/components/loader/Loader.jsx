import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "../../../styles/pages.style";

const Loader = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default Loader;
