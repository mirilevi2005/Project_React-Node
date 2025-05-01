export interface Video{
    _id:string,
    nameCours: String,
    uploadDate:Date,
    finishDate:Date,
    videoPath:String ,
    videoName:String
}

export  interface VideoListProps {
    courseName: string;
  }
export interface VideosResponse {
    videos: Video[];
  }
  



  // export interface VideoApiResponse {
//     videos: Video[]; 
//   }
