
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video } from "../../interface/VideoMaterial";  

const initialState = {  
  VideoList: [] as Video[], 
  uploadedVideo: null as Video | null,
  selectedMaterial: null as Video | null,

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
      state.VideoList = state.VideoList.filter(video => video._id !== action.payload);
    }
    
    
  },
});

export const { setAllVideo, addVideo, setUploadVideo ,deleteVideo} = materialSlice.actions;
export default materialSlice.reducer;





  