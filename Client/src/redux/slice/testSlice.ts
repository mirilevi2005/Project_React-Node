
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudentScore } from '../../interface/Exam';

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
