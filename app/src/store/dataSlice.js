import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const retreiveData = createAsyncThunk(
  "retreiveData",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const data = await AsyncStorage.getItem("userData");
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return rejectWithValue("Something went wrong");
    }
  }
);
export const setActiveChat = createAsyncThunk(
  "setActiveChat",
  async (req, { fulfillWithValue, rejectWithValue }) => {
    try {
      const existingData = await AsyncStorage.getItem("userData");
      if (!existingData) {
        console.error("No existing data found");
        return;
      }

      let userData = JSON.parse(existingData);
      const index = userData[req.chatType].findIndex(
        (item) => item.roomId == req.roomId
      );
      if (index === -1) {
        console.error("No object found with the given roomId");
        return;
      }
      const activeData = userData[req.chatType][index];
      return fulfillWithValue(activeData);
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const saveData = createAsyncThunk(
  "saveData",
  async (req, { fulfillWithValue, rejectWithValue }) => {
    try {
      // console.log("incoming req", req);
      const existingData = await AsyncStorage.getItem("userData");
      let data = {};

      if (existingData) {
        data = JSON.parse(existingData);
      }

      if (data[req.chatType]) {
        data[req.chatType].unshift(req.data);

        data[req.chatType] = data[req.chatType].slice(0, 10);
      } else {
        data[req.chatType] = [req.data];
      }
      await AsyncStorage.setItem("userData", JSON.stringify(data));
      return fulfillWithValue(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);
export const saveMessage = createAsyncThunk(
  "saveMessage",
  async (req, { fulfillWithValue, rejectWithValue }) => {
    try {
      const existingData = await AsyncStorage.getItem("userData");
      if (!existingData) {
        console.error("No existing data found");
        return;
      }
      let userData = JSON.parse(existingData);
      const index = userData[req.chatType].findIndex(
        (item) => item.roomId == req.roomId
      );
      if (index === -1) {
        console.error("No object found with the given roomId");
        return;
      }
      userData[req.chatType][index].msg.push(req.content);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      const updatedData = await AsyncStorage.getItem("userData");
      return fulfillWithValue(updatedData);
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);
export const saveStatus = createAsyncThunk(
  "saveMessage",
  async (req, { fulfillWithValue, rejectWithValue }) => {
    try {
      const existingData = await AsyncStorage.getItem("userData");
      if (!existingData) {
        console.error("No existing data found");
        return;
      }
      let userData = JSON.parse(existingData);
      const index = userData[req.chatType].findIndex(
        (item) => item.roomId == req.roomId
      );
      if (index === -1) {
        console.error("No object found with the given roomId");
        return;
      }
      userData[req.chatType][index].msg.chatStatus = req.chatStatus;
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      const updatedData = await AsyncStorage.getItem("userData");
      return fulfillWithValue(updatedData);
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

const chatDataSlice = createSlice({
  name: "chatData",
  initialState: {
    userData: [],
    activeChat: [],
    fetchStatus: "",
  },

  extraReducers: (builder) => {
    builder.addCase(retreiveData.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.fetchStatus = "Success";
    });
    builder.addCase(retreiveData.pending, (state) => {
      state.fetchStatus = "Loading...";
    });
    builder.addCase(retreiveData.rejected, (state) => {
      state.fetchStatus = "error";
    });
    builder.addCase(setActiveChat.fulfilled, (state, action) => {
      state.activeChat = action.payload;
      state.fetchStatus = "Success";
    });
    builder.addCase(setActiveChat.pending, (state) => {
      state.fetchStatus = "Loading...";
    });
    builder.addCase(setActiveChat.rejected, (state) => {
      state.fetchStatus = "error";
    });
    builder.addCase(saveData.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.fetchStatus = "Success";
    });
    builder.addCase(saveData.pending, (state) => {
      console.log("pending saveData");
      state.fetchStatus = "Loading...";
    });
    builder.addCase(saveData.rejected, (state) => {
      console.log("rejected saveData");
      state.fetchStatus = "Error";
    });
    builder.addCase(saveMessage.fulfilled, (state, action) => {
      // console.log("action", action.payload);
      state.userData = action.payload;
      state.fetchStatus = "Success";
    });
    builder.addCase(saveMessage.pending, (state) => {
      state.fetchStatus = "Loading...";
    });
    builder.addCase(saveMessage.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchStatus = "Error";
    });
  },
});

export default chatDataSlice;
