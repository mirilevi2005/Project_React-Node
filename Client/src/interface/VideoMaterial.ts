

export interface Video {
  _id: string;
  nameCours: string;
  uploadDate: Date;
  finishDate: Date;
  videoPath: string;
  videoName: string;
}


export interface VideosResponse {
  videos: Video[];
}

export interface VideoListProps {
  courseName: string;
}

// export interface Material {
//   _id: string;
//   courseName: string;
//   videoPath: string;
//   videoName: string;
//   uploadDate: Date;
//   finishDate?: Date;
//   cloudinaryPublicId: string; // ה-publicId מ-Cloudinary
// }


export interface Question {
  _id?: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Test {
  _id?: string;
  courseName: string;
  questions: Question[];
  createdAt?: Date;
}

export interface TestsResponse {
  tests: Test[];
}

export interface CreateTestRequest {
  courseName: string;
  questions: Question[];
}


export interface IFormInput {
  TestName: string;
  LastDate: string;
  questions: {
    text: string;
    answers: string[];
    correct: number;
    timeLimit: number;
  }[];
  _id: string;
  title: string;
}
