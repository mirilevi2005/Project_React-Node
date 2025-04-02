export interface Video{
    _id:string,
    nameCours: String,
    uploadDate:Date,
    finishDate:Date,
    videoPath:String ,
    videoName:String
}
export interface VideoApiResponse {
    videos: Video[]; 
  }
export  interface VideoListProps {
    courseName: string;
  }
