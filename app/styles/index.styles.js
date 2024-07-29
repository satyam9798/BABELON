import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { Colors } from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
    //welcome screen css
    banner: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: COLORS.orangeCol,
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    //welcomescreen css
    welcomeBanner: {
        height: 95,
        width: 95,
    },

    //registration screen css

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    iconGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    registrationIcon: {
        height: 45,
        width: 45,
        margin: 5,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    phoneNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginBottom: 10,
    },
    countryPicker: {
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
    },
    inputPhone: {
        flex: 1,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    resendContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    resendButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    resendButtonText: {
        color: '#4C9A2A',
        fontSize: 16,
        marginLeft: 5,
    },
    button: {
        backgroundColor: COLORS.orangeCol,
        padding: 15,
        borderRadius: 10,
        width: '90%',
    },
    disabledButton: {
        backgroundColor: COLORS.grey,
        padding: 15,
        borderRadius: 10,
        width: '90%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    },
    //verification screen
    verifyContainer: {
        height: "100%",
        width: "100%",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    landingBack: {
        width: "100%",
        position: "absolute",
        top: 0,
        opacity: 0.7,
    },
    backIcon: {
        // marginTop: 15,
        // top: 1,
        height: 30,
        width: 30,
        // marginHorizontal: 4,
    },
    verifyHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    verifySubheader: {
        fontSize: 18,
        // marginBottom: 30,
        color: '#666',
    },
    verifyMobileText: {
        fontSize: 18,
        marginBottom: 1,
        marginTop: 1,
        fontWeight: '900',
        color: COLORS.orangeCol,
        margin: 10
    },
    verifyMobileIncorrect: {
        margin: 10,

    },
    verifyTextContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputOtp: {
        width: '80%',
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: '#fff',
    },
    verifyButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        text: 'center',
        backgroundColor: COLORS.orangeCol,
        width: "45%",
        padding: 15,
        borderRadius: 10,
        width: '80%',
        marginBottom: 20,

    },
    verifyDisabledButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        text: 'center',
        backgroundColor: COLORS.grey,
        width: "45%",
        padding: 15,
        borderRadius: 10,
        width: '80%',
        marginBottom: 20,

    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
    },
    resendContainer: {
        alignItems: 'center',
    },
    timerText: {
        color: '#666',
        marginBottom: 10,
    },
    resendButtonText: {
        color: '#4C9A2A',
        fontSize: 16,
    },

    linkIcon: {
        padding: 15,
    },
    // Header: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     marginTop: 30,
    //     marginBottom: 15,
    //     color: '#333',
    // },

    otpInputWrapper: {
        height: "15%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
    },

    otpInputBox: {
        width: 55,
        height: 55,
        backgroundColor: COLORS.orangeCol,
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
    verifyButtonText: {
        fontSize: SIZES.large,
        // color: COLORS.white,
        color: "white",
        // fontFamily: FONTS.bold,
        fontWeight: "600",
    },
    //choose language styles
    languagePageContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    languageContainer: {
        width: "100%",
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
    },
    textContainer: {
        width: "100%",
        // height: "15rem",
        // marginTop: "50%",
        alignItems: "center",
    },
    usernameBody: {
        marginVertical: "10%",
    },
    regSmHeader: {
        marginHorizontal: 20,
        marginVertical: "7%",
        textAlign: "center",
        fontSize: SIZES.xxLarge,
        // fontFamily: FONTS.fontSubHeading,
        // color: COLORS.orangeCol,
        // fontFamily: FONTS.fontSubHeading,
        fontWeight: FONTS.bolder,
    },
    userNameHeader: {
        marginHorizontal: "7%",
        marginVertical: "3%",
        textAlign: "left",
        fontSize: SIZES.large,
        // color: COLORS.white,
        fontFamily: FONTS.fontSubHeading,
        fontWeight: FONTS.bold,
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
    usernameIcon: {
        height: 20,
        width: 20,
        marginHorizontal: 5,
    },
    userNameTextInput: {
        height: "100%",
        width: "100%",
        marginLeft: 10,
        // color: '#444',
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
    langConfirmationBtn: {
        marginHorizontal: 15,
        marginVertical: 20,
        width: "65%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: '#FF6347',
    },
    RegBtnText: {
        fontSize: SIZES.large,
        // color: COLORS.white,
        color: "white",
        // fontFamily: FONTS.bold,
        fontWeight: "600",
    },

    //link share screen

    linkShareContainer: {
        width: "100%",
        height: "100%",
        // backgroundColor: COLORS.white,
        backgroundColor: '#f5f5f5',
        alignItems: "center",
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
        fontWeight: FONTS.bold,
    },
    bottomText: {
        marginTop: "5%",
    },
    bottomText: {
        marginTop: "5%",
    },
    copyLinkIcon: {
        width: "2vw",
        marginHorizontal: 25,
        position: "absolute",
        right: 0,
    },
    dropdownIcon: {
        height: 25,
        width: 25,
    },
    linkInput: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        // width: '100%',
        height: "10.5%",
        flexDirection: "row",
        alignItems: "center",
        // borderWidth: 1,
        borderRadius: 8,
        marginVertical: "1%",
        marginHorizontal: 15,
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
    linkTextInput: {
        // height: '100%',
        // width: '80%',
        // marginLeft: 10,
        marginHorizontal: 20,
        color: "#444",
        // backgroundColor: '#f3f3f3'
    },
    qrTray: {
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: "1.5%",
    },
    IconTray: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 100,
        marginVertical: "3%",
    },
    plusIcon: {
        height: 35,
        width: 35,
    },
    nextBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        text: 'center',
        backgroundColor: COLORS.orangeCol,
        width: "45%",
        padding: 15,
        borderRadius: 10,
        width: '80%',
        marginBottom: 20,
    },
    //main screen

    mainContainer: {
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    MainNavbar: {
        width: "100%",
        height: 55,
        backgroundColor: COLORS.orangeCol,
        marginBottom: "5%",
        justifyContent: 'center',
        paddingHorizontal: '3%',
    },
    NavbarText: {
        fontSize: SIZES.xxLarge,
        color: COLORS.white,
        fontWeight: '500',
    },
    MainSearchInput: {
        width: "95%",
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        backgroundColor: '#fff',
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    filterContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    filterText: {
        fontSize: 16,
        color: '#666',
    },
    filterTextSelected: {
        color: COLORS.orangeCol,
        fontWeight: 'bold',
    },
    listContainer: {
        flex: 1,
        width: "100%",
    },
    newChatButton: {
        position: 'absolute',
        right: 80,
        bottom: 30,
        backgroundColor: COLORS.orangeCol,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsButton: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        backgroundColor: COLORS.grey,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // chat list on main screen
    ChatlistContainer: {
        overflow: "scroll",
    },
    ChatListBox: {
        width: '100%',
        marginHorizontal: "2%",
        display: "flex",
        flexDirection: "row",
        padding: 12,
        borderBottomWidth: 1,
        borderColor: "#b7b7b7",
    },
    chatImgContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    ChatlistText: {
        marginLeft: 15,
        // flexGrow: 8,
        width: 200
    },
    ChatlistName: {
        fontSize: 20,
        fontWeight: FONTS.bold,
        color: "#303030"
    },
    ChatlistDate: {
        color: COLORS.black,
        fontSize: SIZES.medium,
    },
    //chat screen
    chatContainer: {
        flex: 1,
        // width: "100%",
        // height: "100%"
    },
    chatNavBar: {
        // width: "100%",
        height: 60,
        backgroundColor: COLORS.orangeCol,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    chatBackIcon: {
        height: 30,
        width: 30,
    },
    chatName: {
        fontSize: SIZES.medium,
        color: COLORS.white,
        fontWeight: '700',
    },
    transSwitchText: {
        fontSize: SIZES.small,
        color: COLORS.white,
        fontWeight: '700',
    },
    // custom input toolbar
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
        marginHorizontal: 5
    },
    sendButton: {
        height: 40,
        width: 40,
        backgroundColor: "#95ADAA",
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 7,
        marginHorizontal: 10
    },
    sendIcon: {
        width: 24, // Adjust the size as needed
        height: 24, // Adjust the size as needed
        // tintColor: '#000', // Adjust the color as needed
    },
    chatDisplay: {
        height: 40,
        width: 40,
        borderRadius: 50
    },
    //settings page
    settings: {
        flex: 1,
    },
    settingsNavbar: {
        width: "100%",
        height: 55,
        backgroundColor: COLORS.orangeCol,
        marginBottom: "5%",
        justifyContent: 'start',
        alignItems: "center",
        paddingHorizontal: '3%',
        flexDirection: "row"
    },
    settingsNavbarText: {
        fontSize: SIZES.xLarge,
        color: COLORS.white,
        fontWeight: '500',
    },
    settingsBackIcon: {
        height: 35,
        width: 35,
        marginBottom: 10,
        marginHorizontal: 4,
        marginRight: 15
    },
    profileContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        backgroundColor: COLORS.white,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    settingsProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
        padding: 10,
        backgroundColor: COLORS.white,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    settingsImageContainer: {
        width: 70,
        height: 70,
        backgroundColor: COLORS.grey,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    settingsImage: {
        width: 55,
        height: 55,
    },
    settingsTextContainer: {
        flex: 1,
        marginHorizontal: 25
    },
    settingsUsername: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    settingsMobileNumber: {
        fontSize: 14,
        color: '#666',
    },
    personalContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    sectionContainer: {
        width: "100%",
        height: "100%",
        flexDirection: 'column',
        marginVertical: 20,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    detailLabel: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    detailValue: {
        fontSize: 15,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.grey,
        marginVertical: 10,
    },
    collapsibleHeader: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingVertical: 10,
    },
    arrowIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    collapsibleContent: {
        paddingLeft: 10,
        paddingTop: 10,
    },
    privacyPoint: {
        fontSize: 14,
        marginBottom: 8,
        color: COLORS.grey,
    },
    // chat tag user
    modalContainer: {
        // width: "100%",
        position: 'absolute',
        bottom: 10, // Give bottom as per your requirement here I have given with keyboard height and composer input height
        justifyContent: 'flex-end',
        alignSelf: 'center',
        margin: 0,
        ...Platform.select({
            android: {
                marginBottom: 70
            },
            ios: {
                marginBottom: 95
            }
        })
    },
    suggestionContainer: {
        maxHeight: 190,
        backgroundColor: 'rgba(0,0,0,0.08)',
        width: '100%'
    },
    suggestionListStyle: {
        // width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    suggestionClickStyle: {
        alignItems: 'center',
        height: 40,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 10,
        padding: 10
    },
    suggestionRowContainer: {
        width: '100%',
        height: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        height: 40,
        width: 40,
        borderRadius: 5
    },
    userNameText: {
        fontSize: 13,
        letterSpacing: 1,
        width: '80%',
        marginLeft: 10
    },
    // chat details page
    detailsContainer: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    detailsHeader: {
        alignItems: "center",
        padding: 20,
        // backgroundColor: "#fff",
    },
    detailsGroupAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    detailsGroupImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        // backgroundColor: COLORS.grey,
    },
    detailsGroupName: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
    },
    detailsGroupDescription: {
        fontSize: 16,
        color: "#666",
        marginTop: 5,
        textAlign: "center",
    },
    detailsEditButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: COLORS.orangeCol,
        borderRadius: 5,
    },
    detailsEditButtonText: {
        color: "#fff",
        fontWeight: "bold",
        width: 35,
        textAlign: "center"
    },
    detailsMembersContainer: {
        width: "100%"
    },
    memberContainer: {},
    detailsMembersTitle: {
        fontSize: 18,
        fontWeight: "bold",
        margin: 10,
    },
    detailsMemberItem: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        // borderRadius: 50,
        marginHorizontal: 10
    },
    detailsMemberContainer: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 10,
        backgroundColor: COLORS.grey,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    detailsMemberAvatar: {
        width: 35,
        height: 35,

    },
    detailsMemberName: {
        fontSize: 16,
    },
    detailsModalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    detailsModalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    detailsInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
    },
    detailsSubmitButton: {
        backgroundColor: COLORS.orangeCol,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    detailsSubmitButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    detailsNavBar: {
        // width: "100%",
        height: 60,
        backgroundColor: COLORS.orangeCol,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
    },
    detailsIconContainer: {

    },
    detailsBackIcon: {
        marginBottom: 7,
        height: 30,
        width: 30,
    },
    detailsName: {
        marginHorizontal: 15,
        fontSize: SIZES.medium,
        color: COLORS.white,
        fontWeight: '700',
    },
    //popup on details screen
    detailsModalHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginVertical: 10,
    },
    detailsChatModalHeader: {
        marginHorizontal: 45,
        marginVertical: 2,
        fontWeight: "bold",
        fontSize: 20,
    },
    detailsText: {
        fontWeight: "700",
        fontSize: 15,
        marginVertical: 5
    }
});

export default styles;