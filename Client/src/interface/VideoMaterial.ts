export interface Video{
    _id:string,
    nameCours: String,
    uploadDate:Date,
    finishDate:Date,
    videoPath:String ,
    videoName:String
}
export interface VideosResponse {
  videos: Video[];
}

  
  export interface VideoListProps {
    courseName: string;
  }
  
  export interface NewVideoNotification {
    title: string;
    url: string;
  }
  
  export interface MaterialState {
    VideoList: Video[];
    uploadedVideo: Video | null;
    newVideo: NewVideoNotification | null;
    snackbarOpen: boolean;
  }
  



  // export interface VideoApiResponse {
//     videos: Video[]; 
//   }
