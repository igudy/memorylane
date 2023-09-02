import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  // Define the properties of your User interface here
  id: string;
  username: string;
  friends: string;
}

interface Post {
  // Define the properties of your Post interface here
  _id: string;
  title: string;
  content: string;
}

interface AuthState {
  mode: string;
  user: User | null;
  token: string | null;
  posts: Post[];
}

const initialState: AuthState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // state and action by default comes from redux toolkit
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action: PayloadAction<{ friends: string }>) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends non-existent :(");
      }
    },
    setPosts: (state, action: PayloadAction<{ posts: Post[] }>) => {
      state.posts = action.payload.posts;
    },
    setPost: (
      state,
      action: PayloadAction<{ post_id: string; post: Post }>
    ) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer;
