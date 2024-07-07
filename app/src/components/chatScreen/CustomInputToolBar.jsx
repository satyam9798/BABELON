import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { InputToolbar, Send } from "react-native-gifted-chat";
import styles from "../../../styles/index.styles";
import images from "../../../constants/images";

const CustomInputToolbar = (props) => {
  const [text, setText] = useState("");
  const maxCharacters = 180;

  const handleTextChange = (value) => {
    if (value.length <= maxCharacters) {
      setText(value);
      props.onTextChanged(value); // Notify GiftedChat of the text change
    }
  };
  useEffect(() => {
    if (props.clearInput) {
      setText("");
    }
  }, [props.clearInput]);

  return (
    <View>
      <InputToolbar
        {...props}
        containerStyle={styles.toolbarContainer}
        renderComposer={(composerProps) => (
          <View style={styles.inputContainer}>
            <TextInput
              {...composerProps}
              value={text}
              onChangeText={handleTextChange}
              style={styles.textInput}
            />
            <Text style={styles.charCount}>
              {text.length} / {maxCharacters}
            </Text>
          </View>
        )}
        renderSend={(sendProps) => (
          <Send {...sendProps}>
            <View style={styles.sendButton}>
              <Image source={images.Send} style={styles.sendIcon} />
            </View>
          </Send>
          // containerStyle={styles.sendContainer} />
        )}
      />
    </View>
  );
};

export default CustomInputToolbar;
