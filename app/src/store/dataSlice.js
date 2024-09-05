import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const retreiveData = createAsyncThunk(
  "retreiveData",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const data = await AsyncStorage.getItem("userData");
      const queuedMsg = await AsyncStorage.getItem("queuedMsg");
      return fulfillWithValue({ data, queuedMsg });
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
export const setActiveTranscriptedChat = createAsyncThunk(
  "setActiveTranscriptedChat",
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

export const deleteOldData = createAsyncThunk(
  "deleteOldData",
  async (req, { fulfillWithValue, rejectWithValue }) => {
    try {
      const existingData = await AsyncStorage.getItem("userData");
      if (!existingData) {
        console.error("No existing data found");
        return;
      }

      let userData = JSON.parse(existingData);

      const now = new Date();
      const TEN_DAYS_IN_MS = 10 * 24 * 60 * 60 * 1000;
      const expiryDate = now.getTime() - TEN_DAYS_IN_MS;

      // Filter out chats older than 10 days
      Object.keys(userData).forEach((chatType) => {
        userData[chatType] = userData[chatType].filter((chat) => {
          const chatDate = new Date(chat.createdAt).getTime();
          return chatDate >= expiryDate;
        });
      });

      // Save the filtered data back to AsyncStorage
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      return fulfillWithValue(JSON.parse(JSON.stringify(userData)));
    } catch (error) {
      console.log(error);
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

      // Update the message content
      if (req.username) {
        userData[req.chatType][index].username = req.username;
      }
      userData[req.chatType][index].msg.push(req.content);
      userData[req.chatType][index].translatedMsg.push(req.translatedContent);
      userData[req.chatType][index].updatedAt = new Date().toISOString();
      // userData[req.chatType][index].updatedAt = '2024-08-15T18:44:01.331Z';
      // Move the updated chat object to the first index
      const [updatedChat] = userData[req.chatType].splice(index, 1);
      userData[req.chatType].unshift(updatedChat);

      // Save the updated data back to AsyncStorage
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      const updatedData = await AsyncStorage.getItem("userData");
      return fulfillWithValue(updatedData);
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const updateQueuedMessage = createAsyncThunk(
  "updateQueuedMessage",
  async (req, { fulfillWithValue, rejectWithValue }) => {
    try {
      let userData;
      let existingData = await AsyncStorage.getItem("queuedMsg");
      if (!existingData) {
        userData = [];
      } else {
        userData = JSON.parse(existingData);
      }
      // Push the new queued message
      userData.push(req.message);

      // Save the updated data back to AsyncStorage
      await AsyncStorage.setItem("queuedMsg", JSON.stringify(userData));
      return fulfillWithValue(userData);
    } catch (error) {
      console.warn("Error while saving in queue", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

export const saveGroupMembers = createAsyncThunk(
  "saveGroupMembers",
  async (req, { fulfillWithValue, rejectWithValue }) => {
    try {
      const existingData = await AsyncStorage.getItem("userData");
      if (!existingData) {
        console.warn("No existing data found while saving group members");
        return;
      }
      let userData = JSON.parse(existingData);

      for await (const [key, value] of Object.entries(req)) {
        const index = userData["group"].findIndex(
          (item) => item.roomId == key
        );
        if (index === -1) {
          console.warn("No object found with the given roomId while saving members");
          // return;
        } else {
          userData["group"][index].members = req[key].members;
        }
      }
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      const updatedData = await AsyncStorage.getItem("userData");
      return fulfillWithValue(updatedData);
    } catch (error) {
      console.log("error", error)
      return rejectWithValue("Something went wrong");
    }
  }
);
export const updateGroupDetails = createAsyncThunk(
  "updateGroupDetails",
  async (req, { fulfillWithValue, rejectWithValue }) => {
    try {

      const existingData = await AsyncStorage.getItem("userData");
      if (!existingData) {
        console.error("No existing data found");
        return;
      }
      let userData = JSON.parse(existingData);
      const index = userData["group"].findIndex(
        (item) => item.roomId == req.group_id
      );
      if (index === -1) {
        console.error("No object found with the given roomId while updating group details");
        return;
      }
      userData["group"][index].username = req.group_name;
      userData["group"][index].description = req.group_description;
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      const updatedData = await AsyncStorage.getItem("userData");
      return fulfillWithValue(updatedData);
    } catch (error) {
      console.log("error", error)
      return rejectWithValue("Something went wrong");
    }
  }
);

export const saveStatus = createAsyncThunk(
  "saveStatus",
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
export const saveSocketStatus = createAsyncThunk(
  "saveSocketStatus",
  async (req, { fulfillWithValue, rejectWithValue }) => {
    try {
      const status = req.status;
      return fulfillWithValue(status);
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

const chatDataSlice = createSlice({
  name: "chatData",
  initialState: {
    socketActive: "inactive",
    socketStatus: "inactive",
    queuedMsg: [],
    userData: [],
    activeChat: [],
    fetchStatus: "",
  },

  extraReducers: (builder) => {
    builder.addCase(retreiveData.fulfilled, (state, action) => {
      state.userData = action.payload.data;
      state.queuedMsg = action.payload.queuedMsg;
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
      state.fetchStatus = "Loading...";
    });
    builder.addCase(saveData.rejected, (state) => {
      state.fetchStatus = "Error";
    });
    builder.addCase(deleteOldData.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.fetchStatus = "Success";
    });
    builder.addCase(deleteOldData.pending, (state) => {
      state.fetchStatus = "Loading...";
    });
    builder.addCase(deleteOldData.rejected, (state) => {
      state.fetchStatus = "Error";
    });
    builder.addCase(saveGroupMembers.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.fetchStatus = "Success";
    });
    builder.addCase(saveGroupMembers.pending, (state) => {
      state.fetchStatus = "Loading...";
    });
    builder.addCase(saveGroupMembers.rejected, (state) => {
      state.fetchStatus = "Error";
    });
    builder.addCase(updateGroupDetails.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.fetchStatus = "Success";
    });
    builder.addCase(updateGroupDetails.pending, (state) => {
      state.fetchStatus = "Loading...";
    });
    builder.addCase(updateGroupDetails.rejected, (state) => {
      state.fetchStatus = "Error";
    });
    builder.addCase(saveSocketStatus.fulfilled, (state, action) => {
      state.socketActive = action.payload;
      state.fetchStatus = "Success";
      state.socketStatus = action.payload;

    });
    builder.addCase(saveSocketStatus.pending, (state) => {
      state.fetchStatus = "Loading...";
      state.socketStatus = "loading";

    });
    builder.addCase(saveSocketStatus.rejected, (state) => {
      state.fetchStatus = "error";
      state.socketStatus = "error";

    });
    builder.addCase(saveMessage.fulfilled, (state, action) => {
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
    builder.addCase(updateQueuedMessage.fulfilled, (state, action) => {
      state.queuedMsg = action.payload;
      state.fetchStatus = "Success";
    });
    builder.addCase(updateQueuedMessage.pending, (state) => {
      state.fetchStatus = "Loading...";
    });
    builder.addCase(updateQueuedMessage.rejected, (state, action) => {
      state.error = action.payload;
      state.fetchStatus = "Error";
    });
  },
});

export default chatDataSlice;
