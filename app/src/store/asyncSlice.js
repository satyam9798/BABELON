import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const handleToken = createAsyncThunk(
  "handleToken",
  async (req, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log("data handle", req);
      await AsyncStorage.setItem("access", req.access);
      await AsyncStorage.setItem("access", req.websocketToken);
      await AsyncStorage.setItem("mobileNum", req.mobileNum);
      const asyncMobileNum = await AsyncStorage.getItem("mobileNum");
      const asyncToken = await AsyncStorage.getItem("access");
      const asyncWebsocketToken = await AsyncStorage.getItem("websocket_token");
      const response = {
        mobileNum: asyncMobileNum,
        token: asyncToken,
        websocketToken: asyncWebsocketToken,
      };
      return fulfillWithValue(response);
    } catch (error) {
      console.log(error);
      return rejectWithValue("Something went wrong");
    }
  }
);
export const handleUserDetails = createAsyncThunk(
  "handleUserDetails",
  async (req, { fulfillWithValue, rejectWithValue }) => {
    try {
      await AsyncStorage.setItem("username", req.username);
      await AsyncStorage.setItem("language", req.language);
      const asyncUsername = await AsyncStorage.getItem("username");
      const asyncLanguage = await AsyncStorage.getItem("language");
      const response = {
        username: asyncUsername,
        language: asyncLanguage,
      };
      return fulfillWithValue(response);
    } catch (error) {
      console.log(error);
      return rejectWithValue("Something went wrong");
    }
  }
);
export const retreiveAsyncData = createAsyncThunk(
  "retreiveAsyncData",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const asyncUsername = await AsyncStorage.getItem("username");
      const asyncLanguage = await AsyncStorage.getItem("language");
      const asyncMobileNum = await AsyncStorage.getItem("mobileNum");
      const asyncToken = await AsyncStorage.getItem("access");
      const asyncWebsocketToken = await AsyncStorage.getItem("websocket_token");
      const response = {
        username: asyncUsername,
        language: asyncLanguage,
        mobileNum: asyncMobileNum,
        token: asyncToken,
        websocketToken: asyncWebsocketToken,
      };
      return fulfillWithValue(response);
    } catch (error) {
      console.log(error);
      return rejectWithValue("Something went wrong");
    }
  }
);

export const getAsyncDetails = createAsyncThunk(
  "getAsyncDetails",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const asyncUsername = await AsyncStorage.getItem("username");
      const asyncLanguage = await AsyncStorage.getItem("language");
      const asyncMobileNum = await AsyncStorage.getItem("mobileNum");
      const asyncToken = await AsyncStorage.getItem("access");
      const asyncWebsocketToken = await AsyncStorage.getItem("websocket_token");
      const response = {
        username: asyncUsername,
        language: asyncLanguage,
        mobileNum: asyncMobileNum,
        token: asyncToken,
        websocketToken: asyncWebsocketToken,
      };
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const asyncDataSlice = createSlice({
  name: "asyncData",
  initialState: {
    token: null,
    language: null,
    mobileNum: null,
    username: null,
    websocketToken: null,
    fetchStatus: "",
  },
  reducers: {
    getAsyncDetails: (state, action) => {},
  },

  extraReducers: (builder) => {
    builder.addCase(getAsyncDetails.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.websocketToken = action.payload.websocketToken;
      state.mobileNum = action.payload.mobileNum;
      state.username = action.payload.username;
      state.language = action.payload.language;
      state.fetchStatus = "Success";
    });
    builder.addCase(getAsyncDetails.pending, (state) => {
      state.fetchStatus = "Loading...";
    });
    builder.addCase(getAsyncDetails.rejected, (state) => {
      state.fetchStatus = "error";
    });
    builder.addCase(handleToken.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.websocketToken = action.payload.websocketToken;
      state.mobileNum = action.payload.mobileNum;
      state.fetchStatus = "Success";
    });
    builder.addCase(handleToken.pending, (state) => {
      state.fetchStatus = "Loading...";
    });
    builder.addCase(handleToken.rejected, (state, action) => {
      state.fetchStatus = "error";
      state.error = action.payload;
    });
    builder.addCase(handleUserDetails.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.language = action.payload.language;
      state.fetchStatus = "Success";
    });
    builder.addCase(handleUserDetails.pending, (state) => {
      state.fetchStatus = "Loading...";
    });
    builder.addCase(handleUserDetails.rejected, (state, action) => {
      state.fetchStatus = "error";
      state.error = action.payload;
    });
  },
});

export default asyncDataSlice;
