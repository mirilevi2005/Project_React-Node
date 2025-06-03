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

export interface QuestionType {
  _id: string;
  questionText: string;
  options: string[];
  timeLimit: number;
  correctAnswer: string;
}
