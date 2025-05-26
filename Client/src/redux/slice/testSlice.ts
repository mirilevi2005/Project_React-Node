// // import { createSlice } from '@reduxjs/toolkit';
// // const initVal = {
// //   TestArr: [
// //     {
// //       id:"",
// //       TestName: "", 
// //       LastDate: "", 
// //       LimitTest: "", 
// //       questions: [{ question: "", answers: [""], correct: 0, timeLimit: 30 }]
// //     }
// //   ]
// // };


// // const TestSlice = createSlice({
// //   name: "Test",
// //   initialState: initVal,
// //   reducers: {
// //     addTest: (state, action) => {
// //       const {id, TestName, LastDate, LimitTest, questions } = action.payload;
// //       const newTest = { 
// //         id,
// //         TestName, 
// //         LastDate, 
// //         LimitTest, 
// //         questions: questions || [{ question: "", answers: [""], correct: 0, timeLimit: 30 }]
// //       };
// //       state.TestArr.push(newTest);
// //     },
// //     updateTest: (state, action) => {
// //       const { id, updatedData } = action.payload;
// //       const index = state.TestArr.findIndex(test => test.id=== id); // או חפשי לפי מזהה אחר
// //       if (index !== -1) {
// //         state.TestArr[index] = { ...state.TestArr[index], ...updatedData };
// //       }
// //     }
// //   }
// // });

// // export const { addTest, updateTest } = TestSlice.actions;
// // export default TestSlice.reducer;



// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Question {
//   question: string;
//   answers: string[];
//   correct: number;
//   timeLimit: number;
// }

// interface Test {
//   id: string;
//   TestName: string;
//   LastDate: string;
//   LimitTest: string;
//   questions: Question[];
// }

// interface StudentScore {
//   studentId: string;
//   userName: string;
//   score: number;
//   finishedAt?: string;
// }

// interface TestState {
//   TestArr: Test[];
//   selectedGrades: {
//     [testId: string]: StudentScore[];
//   };
// }

// const initialState: TestState = {
//   TestArr: [
//     {
//       id: "",
//       TestName: "",
//       LastDate: "",
//       LimitTest: "",
//       questions: [{ question: "", answers: [""], correct: 0, timeLimit: 30 }],
//     },
//   ],
//   selectedGrades: {},
// };

// const TestSlice = createSlice({
//   name: "Test",
//   initialState,
//   reducers: {
//     addTest: (state, action: PayloadAction<Test>) => {
//       const { id, TestName, LastDate, LimitTest, questions } = action.payload;
//       const newTest = {
//         id,
//         TestName,
//         LastDate,
//         LimitTest,
//         questions: questions || [
//           { question: "", answers: [""], correct: 0, timeLimit: 30 },
//         ],
//       };
//       state.TestArr.push(newTest);
//     },
//     updateTest: (state, action: PayloadAction<{ id: string; updatedData: Partial<Test> }>) => {
//       const { id, updatedData } = action.payload;
//       const index = state.TestArr.findIndex((test) => test.id === id);
//       if (index !== -1) {
//         state.TestArr[index] = { ...state.TestArr[index], ...updatedData };
//       }
//     },
//     setSelectedGrades: (state, action: PayloadAction<{ [testId: string]: StudentScore[] }>) => {
//       state.selectedGrades = action.payload;
//     },
//     clearSelectedGrades: (state) => {
//       state.selectedGrades = {};
//     },
//   },
// });

// export const { addTest, updateTest, setSelectedGrades, clearSelectedGrades } = TestSlice.actions;
// export default TestSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
  question: string;
  answers: string[];
  correct: number;
  timeLimit: number;
}

interface Test {
  id: string;
  title: string;
  LastDate: string;
  LimitTest: string;
  questions: Question[];
}

export interface StudentScore {
  studentId: string;
  userName: string;
  score: number;
  finishedAt?: string;
}

interface TestState {
  TestArr: Test[];
  selectedGrades: {
    [testId: string]: StudentScore[];
  };
}

const initialState: TestState = {
  TestArr: [],
  selectedGrades: {},
};

const TestSlice = createSlice({
  name: "Test",
  initialState,
  reducers: {
    addTest: (state, action: PayloadAction<Test>) => {
      state.TestArr.push(action.payload);
    },
    updateTest: (state, action: PayloadAction<{ id: string; updatedData: Partial<Test> }>) => {
      const { id, updatedData } = action.payload;
      const index = state.TestArr.findIndex(test => test.id === id);
      if (index !== -1) {
        state.TestArr[index] = { ...state.TestArr[index], ...updatedData };
      }
    },
    setSelectedGrades: (state, action: PayloadAction<{ [testId: string]: StudentScore[] }>) => {
      state.selectedGrades = action.payload;
    },
    clearSelectedGrades: (state) => {
      state.selectedGrades = {};
    },
  },
});

export const { addTest, updateTest, setSelectedGrades, clearSelectedGrades } = TestSlice.actions;
export default TestSlice.reducer;
