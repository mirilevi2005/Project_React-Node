
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video } from "../../interface/VideoMaterial";  

const initialState = {  
  VideoList: [] as Video[],  // הגדרה ישירה של מערך מסוג Video
  uploadedVideo: null as Video | null, // משתנה זמני להעלאה
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
    deleteVideo: (state, action: PayloadAction<{ videoPath: string }>) => {
      state.VideoList = state.VideoList.filter(video => video.videoPath !== action.payload.videoPath);
    },
    
    
    
  },
});

export const { setAllVideo, addVideo, setUploadVideo ,deleteVideo} = materialSlice.actions;
export default materialSlice.reducer;





  