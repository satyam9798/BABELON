import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  bgOpacity: {
    opacity: 0.7,
  },

  imgContainer: {
    width: "100%",
    height: "40%",
  },

  langImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  langImgContainer: {
    width: "100%",
    height: "28%",
    paddingHorizontal: 50,
  },
  landingBack: {
    width: "100%",
    position: "absolute",
    top: 0,
    opacity: 0.7,
  },

  textContainer: {
    width: "100%",
    // height: "15rem",
    marginTop: "50%",
    alignItems: "center",
  },
  languageContainer: {
    width: "100%",
    display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },

  langImgBg: {
    backgroundColor: COLORS.black,
  },

  marginStyle: {
    position: "absolute",
    bottom: 80,
  },

  marginStyleLandingPage: {
    // position: 'absolute',
    // bottom: 130
  },

  landingScreenText: {
    textAlign: "center",
    fontSize: SIZES.xxLarge,
    color: COLORS.white,
    // fontFamily: FONTS.fontSubHeading,
    fontWeight: FONTS.bolder,
  },
  rightArrow: {
    height: 25,
    width: 25,
    marginHorizontal: 5,
  },
  usernameIcon: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
  dropdownIcon: {
    height: 25,
    width: 25,
  },
  backIcon: {
    // marginTop: 15,
    height: 30,
    width: 30,
    marginHorizontal: 4,
  },
  navBackIcon: {
    height: 30,
    width: 30,
    marginHorizontal: 4,
  },
  // retryIcon: {
  //   height: 25,
  //   width: 25,
  //   marginHorizontal: 4,
  // },
  plusIcon: {
    height: 35,
    width: 35,
  },

  welcomeText: {
    textAlign: "center",
    fontSize: SIZES.xLarge,
    color: COLORS.white,
    // fontFamily: 'open-Sans',
    fontWeight: FONTS.bolder,
  },

  welcomeHeader: {
    fontSize: SIZES.xxLarge,
    color: COLORS.orangeCol,
    // fontFamily: FONTS.fontSubHeading,
    fontWeight: FONTS.bolder,
  },

  wlcmTxtBottom: {
    textAlign: "center",
    marginVertical: "5%",
    fontSize: SIZES.large,
    color: COLORS.white,
    // fontFamily: FONTS.fontSubHeading,
    fontWeight: FONTS.normal,
  },

  wlcmBtn: {
    width: "65%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    borderRadius: 50,
    backgroundColor: COLORS.orangeCol,
  },

  wlcmBtnText: {
    color: "black",
    fontSize: SIZES.large,
    // color: COLORS.white,
    // fontFamily: FONTS.fontSubHeading,
    fontWeight: "600",
  },

  LandBtn: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: COLORS.orangeCol,
    position: "absolute",
    bottom: 130,
  },

  regHeader: {
    marginHorizontal: 20,
    marginVertical: "7%",
    textAlign: "center",
    fontSize: SIZES.xxLarge,
    // fontFamily: FONTS.fontSubHeading,
    color: COLORS.black,
    // fontFamily: FONTS.fontSubHeading,
    fontWeight: FONTS.bold,
  },

  regSmHeader: {
    marginHorizontal: 20,
    marginVertical: "7%",
    textAlign: "center",
    fontSize: SIZES.xxLarge,
    // fontFamily: FONTS.fontSubHeading,
    color: COLORS.orangeCol,
    // fontFamily: FONTS.fontSubHeading,
    fontWeight: FONTS.bolder,
  },

  regText: {
    textAlign: "center",
    fontSize: SIZES.large,
    // fontFamily: FONTS.fontSubHeading,
    color: COLORS.white,
    fontWeight: FONTS.normal,
    marginHorizontal: 25,
    marginVertical: "4%",
  },
  regInpCont: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: "5%",
  },
  // dropdown language
  regDropdownContainer: {
    borderColor: COLORS.btnBorder,
    // backgroundColor: COLORS.textInput,
    width: "22%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    // borderRadius: 8,
    // marginHorizontal: 5,
    marginRight: 10,
    // marginVertical: "3%",
  },
  regDropdown: {
    height: 50,
    borderColor: "gray",
    // borderWidth: 0.5,
    // borderRadius: 8,
    width: "100%",
    // paddingHorizontal: 8,
  },
  regIcon: {
    marginRight: 50,
  },
  regLabel: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    borderRadius: 50,
  },
  regPlaceholderStyle: {
    fontSize: 16,
    color: "grey",
  },
  regSelectedTextStyle: {
    fontSize: 13,
    marginHorizontal: 10,
    color: "grey",
  },
  regIconStyle: {
    width: 20,
    height: 20,
  },
  regInputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  RegInput: {
    borderColor: COLORS.btnBorder,
    backgroundColor: COLORS.textInput,
    width: "85%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: "3%",
  },

  RegInputIcon: {
    width: "5%",
    marginHorizontal: "3%",
  },

  RegTextInput: {
    width: "100%",
    fontSize: 15,
  },

  RegBtn: {
    marginHorizontal: 15,
    marginVertical: 20,
    width: "65%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: COLORS.orangeCol,
  },

  langConfirmationBtn: {
    marginHorizontal: 15,
    marginVertical: 20,
    width: "65%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: COLORS.orangeCol,
  },

  disabledRegBtn: {
    marginHorizontal: 15,
    marginVertical: 20,
    width: "65%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: COLORS.white,
  },

  disabledUserNameBtn: {
    marginHorizontal: 15,
    marginVertical: 20,
    width: "65%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: COLORS.grey,
  },

  usernameBody: {
    marginVertical: "10%",
  },

  disabledBtn: {
    marginHorizontal: 15,
    marginVertical: 20,
    width: "65%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: COLORS.grey,
  },

  verifyOtpBtn: {
    marginHorizontal: 15,
    marginVertical: 20,
    width: "65%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: COLORS.orangeCol,
  },

  RegBtnText: {
    fontSize: SIZES.large,
    // color: COLORS.white,
    color: "black",
    // fontFamily: FONTS.bold,
    fontWeight: "600",
  },

  regContainer: {
    width: "100%",
    height: "100%",
    // backgroundColor: COLORS.white,
    alignItems: "center",
  },
  regBodyContainer: {
    width: "100%",
    marginTop: "50%",
  },

  otpInputWrapper: {
    height: "15%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },

  otpInputBox: {
    width: "15%",
    backgroundColor: "#f3f3f3",
    marginHorizontal: 10,
    borderRadius: 5,
    textAlign: "center",
  },

  timer: {
    width: "75%",
    marginHorizontal: 55,
    marginTop: 5,
    display: "flex",
    // flexDirection: "flex-end",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  resendOTP: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  userNameIcon: {
    width: "2vw",
    marginHorizontal: 10,
  },

  languageIcon: {
    width: "2vw",
  },

  userNameInput: {
    marginHorizontal: "7%",
    borderColor: COLORS.btnBorder,
    backgroundColor: COLORS.textInput,
    width: 325,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: "3%",
  },
  dropdownInput: {
    heigth: 45,
  },
  dropdown1BtnTxtStyle: {
    color: "#444",
    textAlign: "left",
  },

  dropdown1BtnStyle: {
    width: "95%",
    height: 45,
    backgroundColor: COLORS.textInput,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 10,
  },

  userNameTextInput: {
    height: "100%",
    width: "100%",
    marginLeft: 10,
    // color: '#444',
  },

  dropdown2DropdownStyle: {
    borderRadius: 12,
  },

  dropdown2RowStyle: {
    backgroundColor: COLORS.grey,
    borderBottomColor: "#C5C5C5",
  },

  dropdown2RowTxtStyle: {
    color: "white",
    textAlign: "center",
    fontWeight: FONTS.bold,
  },

  userNameHeader: {
    marginHorizontal: "7%",
    marginVertical: "3%",
    textAlign: "left",
    fontSize: SIZES.large,
    // color: COLORS.white,
    // fontFamily: FONTS.fontSubHeading,
    fontWeight: FONTS.bold,
  },

  dropdown3BtnChildStyle: {
    flexDirection: "row",
    alignItems: "center",
  },

  dropdown3BtnTxt: {
    color: "#444",
    textAlign: "center",
    fontWeight: "normal",
    fontSize: 15,
    marginHorizontal: 20,
  },

  linkShareScreenContainer: {
    width: "100%",
  },

  linkShareHeader: {
    textAlign: "center",
    fontSize: SIZES.medium,
    color: COLORS.black,
    // fontFamily: FONTS.fontSubHeading,
    fontWeight: FONTS.normal,
  },

  linkShareSmHeader: {
    textAlign: "center",
    fontSize: SIZES.medium,
    color: COLORS.black,
    // fontFamily: FONTS.fontSubHeading,
    fontWeight: FONTS.normal,
  },

  linkShareSmHeader: {
    textAlign: "center",
    fontSize: SIZES.medium,
    color: COLORS.black,
    // fontFamily: FONTS.fontSubHeading,
    fontWeight: FONTS.bold,
  },

  linkShareSubHeader: {
    textAlign: "center",
    fontSize: SIZES.xLarge,
    color: COLORS.black,
    fontFamily: "open-Sans",
    fontWeight: FONTS.bolder,
  },

  linkShareSubSmHeader: {
    textAlign: "center",
    fontSize: SIZES.Large,
    color: COLORS.black,
    // fontFamily: FONTS.fontSubHeading,
    fontWeight: FONTS.bolder,
  },

  IconTray: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 100,
    marginVertical: "3%",
  },

  qrTray: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "1.5%",
  },

  nextBtn: {
    // position: 'absolute',
    // bottom: 25
  },
  linkInput: {
    backgroundColor: "#f3f3f3",
    // width: '100%',
    height: "10.5%",
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    borderRadius: 8,
    marginVertical: "1%",
    marginHorizontal: 15,
  },

  linkTextInput: {
    // height: '100%',
    // width: '80%',
    // marginLeft: 10,
    marginHorizontal: 20,
    color: "#444",
    // backgroundColor: '#f3f3f3'
  },
  copyLinkIcon: {
    width: "2vw",
    marginHorizontal: 25,
    position: "absolute",
    right: 0,
  },

  bottomText: {
    marginTop: "5%",
  },
  MainNavbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "3%",
    marginVertical: "5%",
  },
  NavbarText: {
    fontSize: SIZES.xxLarge,
  },
  NavbarIconTab: {
    display: "flex",
    flexDirection: "row",
  },
  MainScreenSearch: {},
  MainSearchInput: {
    marginHorizontal: "3%",
    borderColor: COLORS.btnBorder,
    backgroundColor: COLORS.white,
    width: "95%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: "3%",
  },
  noChatData: {
    // flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  //css for status container
  // StatusContainer: {
  //     display: 'flex',
  //     flexDirection: 'row',
  // },
  // AddStatus: {
  //     margin: '3%',
  //     width: 75,
  //     height: 75,
  //     borderRadius: 50,
  //     display: 'flex',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     borderWidth: 5,
  //     borderStyle: 'dotted',
  //     borderColor: COLORS.orangeCol
  // },
  // StatusImgContainer: {
  //     // width: 10,
  // },
  // StatusImg: {
  //     marginVertical: '13%',
  //     marginHorizontal: '2%',
  //     width: 75,
  //     height: 75,
  //     borderRadius: 50,
  //     resizeMode: 'contain',
  //     borderWidth: 5,
  //     borderColor: COLORS.orangeCol
  // },

  //for custom input toolbar on chat screen

  toolbarContainer: {
    backgroundColor: "#E8E8E8",
    borderTopColor: "#E8E8E8",
    borderTopWidth: 1,
    padding: 8,
    borderRadius: 50,
    marginHorizontal: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  textInput: {
    flex: 1,
    padding: 10,
    // borderColor: "gray",
    // borderWidth: 1,
    // borderRadius: 5,
  },
  charCount: {
    marginLeft: 10,
    color: "gray",
  },
  sendContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginRight: 15,
  },
  // End
  chatImgContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    fontWeight: "600",
  },
  ChatlistContainer: {
    overflow: "scroll",
  },
  ChatListBox: {
    // width: '95%',
    marginHorizontal: "2%",
    display: "flex",
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#b7b7b7",
  },
  ChatListImage: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  ChatlistText: {
    marginLeft: 15,
    flexGrow: 8,
  },
  ChatlistName: {
    fontSize: 20,
    fontWeight: FONTS.bold,
  },
  ChatlistDate: {
    marginVertical: "2%",
    color: COLORS.black,
    fontSize: SIZES.medium,
  },
  ChatlistMsg: {
    fontSize: SIZES.medium,
    marginBottom: 15,
  },

  chatNavBar: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.orangeCol,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: SIZES.medium,
    fontWeight: FONTS.bold,
    marginHorizontal: 10,
  },
  centeredView: {},
  chatModal: {
    backgroundColor: COLORS.backdrop,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    height: "50%",
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 20,
  },
  ModalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 10,
  },
  ModalTextInput: {
    width: "100%",
    backgroundColor: COLORS.textInput,
    height: "15%",
    borderRadius: 20,
  },
  ChatModalHeader: {
    marginHorizontal: 45,
    marginVertical: 2,
    fontWeight: "bold",
    fontSize: 20,
  },
  ToggleContainer: {
    // marginVertical: 10,
    flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
  },
  radioWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: "35%",
  },
  toggleText: {
    marginHorizontal: 10,
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 15,
  },
  radioText: {
    fontSize: 10,
    fontWeight: "700",
    marginVertical: 10,
  },
  radioOuter: {
    width: 25,
    height: "80%",
    borderWidth: 1,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  radioInner: {
    width: 20,
    height: "80%",
    backgroundColor: "gray",
    borderRadius: 10,
  },
  chatLinkBtn: {
    mmarginHorizontal: 15,
    marginVertical: 20,
    width: "75%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: COLORS.orangeCol,
  },
  disabledChatLinkBtn: {
    marginHorizontal: 15,
    width: "65%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: COLORS.grey,
  },
  chatLinkBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontWeight: "600",
  },
  // dropdown language
  dropdownContainer: {
    // width: "30%",
    // padding: 15,
  },
  dropdown: {
    height: 50,
    width: 325,
    marginHorizontal: "7%",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: COLORS.textInput,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    borderRadius: 50,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default styles;
