
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Video } from "../../interface/VideoMaterial";  

// const initialState = {  
//   VideoList: [] as Video[],  // הגדרה ישירה של מערך מסוג Video
//   uploadedVideo: null as Video | null, // משתנה זמני להעלאה

// };

// const materialSlice = createSlice({
//   name: "videos",
//   initialState,
//   reducers: {
//     setAllVideo: (state, action: PayloadAction<Video[]>) => {
//       state.VideoList = action.payload;
//     },
//     addVideo: (state, action: PayloadAction<Video>) => {
//       state.VideoList.push(action.payload);
//     },
//     setUploadVideo: (state, action: PayloadAction<Video | null>) => {
//       state.uploadedVideo = action.payload;
//     },
   
//     deleteVideo: (state, action: PayloadAction<string>) => {
//       state.VideoList = state.VideoList.filter(video => video._id !== action.payload);
//     }
    
    
//   },
// });

// export const { setAllVideo, addVideo, setUploadVideo ,deleteVideo} = materialSlice.actions;
// export default materialSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video, MaterialState, NewVideoNotification } from "../../interface/VideoMaterial";

const initialState: MaterialState = {
  VideoList: [],
  uploadedVideo: null,
  newVideo: null,
  snackbarOpen: false,
};

const materialSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setAllVideo: (state, action: PayloadAction<Video[]>) => {
      state.VideoList = action.payload;
    },
    addVideo: (state, action: PayloadAction<Video>) => {
      state.VideoList.push(action.payload);
    },
    setUploadVideo: (state, action: PayloadAction<Video | null>) => {
      state.uploadedVideo = action.payload;
    },
    deleteVideo: (state, action: PayloadAction<string>) => {
      state.VideoList = state.VideoList.filter((video) => video._id !== action.payload);
    },
    setNewVideoNotification: (state, action: PayloadAction<NewVideoNotification>) => {
      state.newVideo = action.payload;
      state.snackbarOpen = true;
    },
    hideVideoNotification: (state) => {
      state.newVideo = null;
      state.snackbarOpen = false;
    },
  },
});

export const {
  setAllVideo,
  addVideo,
  setUploadVideo,
  deleteVideo,
  setNewVideoNotification,
  hideVideoNotification,
} = materialSlice.actions;

export default materialSlice.reducer;
