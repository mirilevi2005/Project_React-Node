export interface Exam {
    _id: string;
    title: string;
    lastDate: string;
    questions: Question[];
    alreadyStarted:boolean;
    createdAt :Date;
    courseName:string
 }

  
  export interface Question {
    _id: string;
    questionText: string;
    options: string[];
    timeLimit: number; 
    correctAnswer:string;
}


export interface TestType {
  _id: string;
  title: string;
  lastDate: string;
  questions: QuestionType[];
  alreadyStarted: boolean;
  createdAt: Date;
  courseName: string;
  
}
// interface TestType {
//   _id: string;
//   title: string;
//   lastDate: string;
//   questions: {
//     questionText: string;
//     options: string[];
//     correctAnswer: string;
//     timeLimit: number;
//   }[];
// }

export interface QuestionType {
  _id: string;
  questionText: string;
  options: string[];
  timeLimit: number;
  correctAnswer: string;
}


export interface TestScore {
  testId: string;
  studentId: string;
  scores: number;
  submittedAt?: string;
  studentName?: string; 
}


export interface StudentScore {
  studentId: string;
  scores: number;
  userName: string;
  finishedAt?: string;
}


export interface QuestionInput {
  text: string;
  answers: string[];
  correct: number;
  timeLimit: number;
}



interface IFormInput {
  TestName: string;
  LastDate: string;
  questions: QuestionInput[];
  _id?: string;
}