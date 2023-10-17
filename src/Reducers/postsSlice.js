import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { create_User, fetch_get,create_post } from "../utils";

//create post action

export const createPost = createAsyncThunk(
    "createPost",
    async (data, { rejectWithValue }) => {
        try {
            console.log("--1--send--post-", data);
            const response = await create_post(
                "http://192.168.1.197:8080/api/v1/media/addMedia",
                data
            );

            console.log("------2--send--post--");
            return response;
        } catch (error) {
            console.log("---3--send-error-post--");
            return rejectWithValue(error);
        }
    }
);

//recommended posts
export const recommendedPosts = createAsyncThunk(
    "recommendedPosts",
    async (userId, { rejectWithValue }) => {
      console.log("---1--recommend--post--");
      try {
        const response = await fetch_get(
          `http://192.168.1.197:8080/api/v1/userRecommend/recommendedMedia/${userId}`
        );
        console.log("----2-read--post-");
        const result = await response.data;
        console.log("--3--recommend- post");
  
        return result;
      } catch (error) {
        console.log("--error-recommed---post--");
  
        return rejectWithValue(error);
      }
    }
  );

export const post = createSlice({
    name: "post",
    initialState: {
        user_post: [],
        loading: false,
        error: null,
        recommended_posts:[],

    },
    reducers: {
        userPosts: (state, action) => {
            return { ...state, users: action.payload };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createPost.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.loading = false;
            state.user_post.push(action.payload);
        });
        builder.addCase(createPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
        builder.addCase(recommendedPosts.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(recommendedPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.recommended_posts = action.payload;
          });
          builder.addCase(recommendedPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          });

    },
});



export default post.reducer;