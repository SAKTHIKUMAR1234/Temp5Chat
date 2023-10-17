import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch_get } from "../utils";

//read action recommended user
export const recommendedUser = createAsyncThunk(
  "recommendedUser",
  async (userId, { rejectWithValue }) => {
    console.log("---1--recommend-user-");
    try {
      const response = await fetch_get(
        `http://192.168.1.197:8080/api/v1/userRecommend/recommendedUsers/${userId}`
      );
      console.log("----2-read-user-");
      const result = await response.data;
      console.log("--3--recommend-");

      return result;
    } catch (error) {
      console.log("--error-recommed-user--");

      return rejectWithValue(error);
    }
  }
);

//follow requested users
export const requestedUser = createAsyncThunk(
  "requestedUser",
  async (userId, { rejectWithValue }) => {
    console.log("---1--requesteduser--");
    try {
      const response = await fetch_get(
        `http://192.168.1.197:8080/api/v1/userRecommend/recommendedUsers/${userId}`
      );
      console.log("----2-requesteduser----");
      const result = await response.data;
      console.log("--3--recommend-", result);

      return result;
    } catch (error) {
      console.log("--error-requested user---");

      return rejectWithValue(error);
    }
  }
);

//notifications list
export const notificationList = createAsyncThunk(
  "notificationList",
  async (userId, { rejectWithValue }) => {
    console.log("---1--notify list--");
    try {
      const response = await fetch_get(
        `http://192.168.1.197:8080/api/v1/notifyUser/getNotifications/${userId}`
      );
      console.log("----2-notify list----");
      const result = await response.data;
      console.log("--3--recommend-", result);

      return result;
    } catch (error) {
      console.log("--error--notifylist---");

      return rejectWithValue(error);
    }
  }
);




export const recommendationList = createSlice({
  name: "recommendationList",
  initialState: {
    user_suggestion: [],
    loading: false,
    error: null,
    requested_user:[],
    notify_list:[],

  },
  reducers: {
    recommendationLists: (state, action) => {
      return { ...state, user_suggestion: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(recommendedUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(recommendedUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user_suggestion = action.payload;
    });
    builder.addCase(recommendedUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(requestedUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(requestedUser.fulfilled, (state, action) => {
      state.loading = false;
      state.requested_user = action.payload;
    });
    builder.addCase(requestedUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(notificationList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(notificationList.fulfilled, (state, action) => {
      state.loading = false;
      state.notify_list = action.payload;
    });
    builder.addCase(notificationList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

  },
});

export const { recommendationLists } = recommendationList.actions;

export default recommendationList.reducer;
