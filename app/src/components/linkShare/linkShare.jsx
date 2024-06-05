import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Share,
  Linking,
} from "react-native";
import images from "../../../constants/images";
import styles from "../../../styles/pages.style";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-simple-toast";
import QRCode from "react-native-qrcode-svg";

const ShareLink = ({ route, navigation }) => {
  const { link, data } = route?.params;
  const { width, height } = Dimensions.get("window");
  const displayLink = link?.slice(0, 40) + "...";
  const nextScreen = () => {
    navigation.navigate("chat", {
      data: data,
      userType: data.userType,
      roomId: data.roomId,
      chatType: data.chatType,
      linkType: data.linkType,
    });
  };
  const handleBackNavigation = async () => {
    navigation.navigate("main");
  };

  const copyLinkToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(link);
      Toast.show("Link copied");
    } catch (err) {}
  };

  const share = async (customOptions = options) => {
    try {
      const result = await Share.share({
        message: "Hi, start a chat on BabelON  " + link,
      });
      if (result) {
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // handle shared activityType
          } else {
            // handle shared activityType
          }
        } else if (result.action === Share.dismissedAction) {
          // handle dismissedAction activityType
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const shareViaWhatsapp = async () => {
    // to share directly to whatsapp application (needed in later phase)
    // sendIntent(
    //     'android.intent.action.SEND',
    //     {
    //         text: url,
    //         type: 'text/plain',
    //         packageName: 'com.whatsapp',
    //     },
    //     'Share via WhatsApp'
    // );
    const result = await Share.share({
      message: "Hi, start a chat on BabelON  " + link,
    });
  };
  const shareViaEmail = () => {
    const emailSubject = "Check out this link";
    const emailBody = `Hi,\n\nI found this link interesting: ${link}.Start a chat in your language.\n\nRegards`;

    Linking.openURL(`mailto:?subject=${emailSubject}&body=${emailBody}`);
  };
  const shareViaSMS = () => {
    const smsBody = `Check out this BabelON link: ${link}`;

    Linking.openURL(`sms:?body=${smsBody}`);
  };

  return (
    <>
      <View style={{ backgroundColor: "#FFFFFF", width: "100%" }}>
        <TouchableOpacity onPress={handleBackNavigation}>
          <Image style={styles.backIcon} source={images.LeftArrowBlackIcon} />
        </TouchableOpacity>
      </View>
      <View style={[styles.container, styles.regContainer]}>
        <View style={styles.linkShareScreenContainer}>
          <Text
            style={
              width > 350 ? styles.linkShareHeader : styles.linkShareSmHeader
            }
          >
            Invite your friends to start 'Babeling'{"\n"}
          </Text>

          <Text
            style={
              width > 350
                ? styles.linkShareSubHeader
                : styles.linkShareSubSmHeader
            }
          >
            Share link / scan QR code
          </Text>
          <Text
            style={
              width > 350
                ? styles.linkShareSubHeader
                : styles.linkShareSubSmHeader
            }
          >
            with your friends {"\n"}
          </Text>

          <View style={styles.linkInput}>
            <TouchableOpacity onPress={copyLinkToClipboard}>
              <TextInput
                style={styles.linkTextInput}
                value={displayLink}
                editable={false}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                await copyLinkToClipboard();
              }}
              style={styles.copyLinkIcon}
            >
              <Image style={styles.dropdownIcon} source={images.CopyIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.IconTray}>
            <TouchableOpacity onPress={shareViaEmail}>
              <Image
                onPress={shareViaEmail}
                style={styles.plusIcon}
                source={images.Email}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={shareViaWhatsapp}>
              <Image style={styles.plusIcon} source={images.Whatsapp} />
            </TouchableOpacity>
            <TouchableOpacity onPress={shareViaSMS}>
              <Image style={styles.plusIcon} source={images.SMS} />
            </TouchableOpacity>
          </View>

          <View style={styles.qrTray}>
            <QRCode
              size={160}
              logoSize={100}
              logoBackgroundColor="transparent"
              value={link}
            />
          </View>

          <Text
            style={[
              width > 350 ? styles.linkShareHeader : styles.linkShareSmHeader,
              styles.bottomText,
            ]}
          >
            Start Translating and Connecting in Any
          </Text>

          <Text
            style={
              width > 350 ? styles.linkShareHeader : styles.linkShareSmHeader
            }
          >
            Languages Right Away {"\n"}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.RegBtn, styles.nextBtn]}
          onPress={nextScreen}
        >
          <Text style={styles.RegBtnText}>Lets's Babel</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default ShareLink;
