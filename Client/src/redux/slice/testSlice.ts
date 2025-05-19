import { createSlice } from '@reduxjs/toolkit';
const initVal = {
  TestArr: [
    {
      id:"",
      TestName: "", 
      LastDate: "", 
      LimitTest: "", 
      questions: [{ question: "", answers: [""], correct: 0, timeLimit: 30 }]
    }
  ]
};


const TestSlice = createSlice({
  name: "Test",
  initialState: initVal,
  reducers: {
    addTest: (state, action) => {
      const {id, TestName, LastDate, LimitTest, questions } = action.payload;
      const newTest = { 
        id,
        TestName, 
        LastDate, 
        LimitTest, 
        questions: questions || [{ question: "", answers: [""], correct: 0, timeLimit: 30 }]
      };
      state.TestArr.push(newTest);
    },
    updateTest: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.TestArr.findIndex(test => test.id=== id); // או חפשי לפי מזהה אחר
      if (index !== -1) {
        state.TestArr[index] = { ...state.TestArr[index], ...updatedData };
      }
    }
  }
});

export const { addTest, updateTest } = TestSlice.actions;
export default TestSlice.reducer;
