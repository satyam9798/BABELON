import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
} from "react-native";
import { InputToolbar, Send } from "react-native-gifted-chat";
import styles from "../../../styles/index.styles";
import images from "../../../constants/images";
import Modal from "react-native-modal";

const CustomInputToolbar = (props) => {
  const userList = props.members;
  const [text, setText] = useState("");
  const maxCharacters = 180;
  const [modalVisible, setModalVisible] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(userList);
  const [userName, setUserName] = useState("");

  const msgInputRef = useRef(null);
  const scrollViewRef = useRef(null);
  const currentMsg = useRef(null);

  const handleTextChange = (value) => {
    if (value.length <= maxCharacters) {
      setText(value);
      onTextChange(value);
      currentMsg.current = value;
      // props.onTextChanged(value); // Notify GiftedChat of the text change
    } else if (value.length >= maxCharacters) {
      const trimmedText = value.slice(0, 180);
      setText(trimmedText);
      onTextChange(trimmedText);
      currentMsg.current = trimmedText;
    }
  };
  useEffect(() => {
    props.onTextChanged(currentMsg.current); // Notify GiftedChat of the text change
  }, [currentMsg.current]);

  useEffect(() => {
    if (props.clearInput) {
      setText("");
    }
  }, [props.clearInput]);

  const handleScrollTo = (point) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(point);
    }
  };

  const getUserSuggestions = (keyword) => {
    setIsLoading(true);
    if (Array.isArray(userList)) {
      if (keyword.slice(1) === "") {
        setUserData([...userList]);
        setUserName(keyword);
        setIsLoading(false);
      } else {
        const userDataList = userList.filter(
          (number) => number.indexOf(keyword.slice(1)) !== -1
        );
        setUserData([...userDataList]);
        setUserName(keyword);
        setIsLoading(false);
      }
    }
  };

  const renderSuggestionsRow = ({ item }) => {
    const profileImage = images.Single;
    return (
      <TouchableOpacity
        style={styles.suggestionClickStyle}
        onPress={() => onSuggestionTap(item)}
      >
        <View style={styles.suggestionRowContainer}>
          <Image style={styles.userImage} source={profileImage} />
          <Text style={styles.userNameText}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onSuggestionTap = (number) => {
    setModalVisible(false);
    const sliceText = text.slice(0, -userName.length);
    setText(sliceText + "@" + number + " ");
    currentMsg.current = sliceText + "@" + number + " ";
  };
  const onTextChange = (value, props) => {
    const lastChar = text.substr(text.length - 1);
    const currentChar = value.substr(value.length - 1);
    const spaceCheck = /[^@A-Za-z_]/g;
    setText(value);
    currentMsg.current = value;
    if (value.length === 0) {
      setModalVisible(false);
    } else {
      if (spaceCheck.test(lastChar) && currentChar != "@") {
        setModalVisible(false);
      } else {
        const checkSpecialChar = currentChar.match(/[^@A-Za-z_]/);
        if (checkSpecialChar === null || currentChar === "@") {
          const pattern = new RegExp(`\\B@[0-9]+|\\B@`, `gi`);
          const matches = value.match(pattern) || [];
          if (matches.length > 0) {
            getUserSuggestions(matches[matches.length - 1]);
            setModalVisible(true);
          } else {
            setModalVisible(false);
          }
        }
      }
    }
  };

  return (
    <>
      <Modal
        isVisible={modalVisible}
        coverScreen={false}
        deviceHeight={400}
        onBackdropPress={() => setModalVisible(false)}
        backdropColor={"transparent"}
        scrollTo={handleScrollTo}
        scrollOffset={scrollOffset}
        scrollOffsetMax={300 - 200}
        animationIn="fadeIn"
        animationInTiming={100}
        animationOut="fadeOut"
        onModalShow={() => {
          msgInputRef.current.focus();
        }}
        style={styles.modalContainer}
      >
        <View style={styles.suggestionContainer}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              contentContainerStyle={styles.suggestionListStyle}
              data={userList}
              renderItem={renderSuggestionsRow}
              keyExtractor={(item, index) => index.toString()}
              keyboardShouldPersistTaps="always"
            />
          )}
        </View>
      </Modal>
      <View>
        <InputToolbar
          {...props}
          containerStyle={styles.toolbarContainer}
          renderComposer={(composerProps) => (
            <View style={styles.inputContainer}>
              <TextInput
                {...composerProps}
                value={text}
                ref={msgInputRef}
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
    </>
  );
};

export default CustomInputToolbar;
