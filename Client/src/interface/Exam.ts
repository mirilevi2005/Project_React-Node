export interface Exam {
    _id: string;
    title: string;
    lastDate: string;
    questions: Question[];
    alreadyStarted:boolean;

  }
  
  export interface Question {
    _id: string;
    questionText: string;
    options: string[];
    timeLimit: number; 
    correctAnswer:string;
}