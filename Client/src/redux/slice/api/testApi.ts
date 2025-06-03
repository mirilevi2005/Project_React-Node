
import { Exam, TestScore } from '../../../interface/Exam';

import apiSlice from './apiSlice';


const testApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createTest: builder.mutation({
      query: (testData) => ({
        url: '/test',
        method: 'POST',
        body: testData,
      }),
      invalidatesTags: ['Test'],
    }),

    getTests: builder.query({
      query: () => '/test',
      providesTags: ['Test'],
    }),

    getTestById: builder.query({
      query: (id) => `/test/${id}`,
      providesTags: ['Test'],
    }),

    getTestsByCourse: builder.query({
      query: ({ courseName, studentId }) =>
        `/test/course/${courseName}?studentId=${studentId}`,
      providesTags: ['Test'],
    }),

    getTestsByCourseForTeacher: builder.query({
      query: (courseName) => `/test/courseForTeacher/${courseName}`,
      providesTags: ['Test'],
    }),

    updateTest: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/test/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['Test'],
    }),

    deleteTest: builder.mutation({
      query: (id) => ({
        url: `/test/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Test'],
    }),

    startTest: builder.mutation({
      query: ({ testId, studentId }) => ({
        url: `test/start/${testId}`,
        method: 'POST',
        body: { studentId },
      }),
      invalidatesTags: ['Test'],
    }),

    submitScore: builder.mutation({
      query: ({ testId, studentId, score }) => ({
        url: `test/${testId}/submit-score`,
        method: 'POST',
        body: { testId, studentId, score },
      }),
      invalidatesTags: ['Test'],
    }),

getTestScores: builder.query<TestScore[], string>({
  query: (testId) => `test/scores/${testId}`,
  providesTags: ['Test'],
}),

getNewTests: builder.query<Exam[], string>({
  query: (lastLogin) => `/test/new/${lastLogin}`,
}),
 
getRecentTestsForStudent: builder.query<Exam[], string>({  // מקבל studentId כמחרוזת
  query: (studentId) => `/test/recent/${studentId}`,
  providesTags: ['Test'],
}),


  }),

});

export const {
  useLazyGetTestScoresQuery,
  useGetTestsByCourseForTeacherQuery,
  useCreateTestMutation,
  useGetTestsQuery,
  useGetTestByIdQuery,
  useGetTestsByCourseQuery,
  useUpdateTestMutation,
  useDeleteTestMutation,
  useStartTestMutation,
  useSubmitScoreMutation,
  useGetTestScoresQuery,
   useGetNewTestsQuery,
useGetRecentTestsForStudentQuery

} = testApi;

export default testApi;
