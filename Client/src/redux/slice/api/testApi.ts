

// import apiSlice from './apiSlice';
// // טיפוס לציון מבחן לסטודנט
// export interface TestScore {
//   testId: string;
//   studentId: string;
//   score: number;
//   submittedAt?: string;
//   studentName?: string; // נוח לתצוגה בממשק
// }
// const testApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({

//     // יצירת מבחן חדש
//     createTest: builder.mutation({
//       query: (testData) => ({
//         url: '/test',
//         method: 'POST',
//         body: testData,
//       }),
//       invalidatesTags: ['Test'],
//     }),

//     // שליפת כל המבחנים
//     getTests: builder.query({
//       query: () => '/test',
//       providesTags: ['Test'],
//     }),

//     // שליפת מבחן לפי מזהה
//     getTestById: builder.query({
//       query: (id) => `/test/${id}`,
//       providesTags: ['Test'],
//     }),

//     // שליפת מבחנים לפי קורס וסטודנט
//     getTestsByCourse: builder.query({
//       query: ({ courseName, studentId }) =>
//         `/test/course/${courseName}?studentId=${studentId}`,
//       providesTags: ['Test'],
//     }),

//     getTestsByCourseForTeacher: builder.query({
//   query: (courseName) => `/test/courseForTeacher/${courseName}`,
//   providesTags: ['Test'],
// }),

//     // עדכון מבחן קיים
//     updateTest: builder.mutation({
//       query: ({ id, updatedData }) => ({
//         url: `/test/${id}`,
//         method: 'PUT',
//         body: updatedData,
//       }),
//       invalidatesTags: ['Test'],
//     }),

//     // מחיקת מבחן
//     deleteTest: builder.mutation({
//       query: (id) => ({
//         url: `/test/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Test'],
//     }),

//     // התחלת מבחן לסטודנט
//     startTest: builder.mutation({
//       query: ({ testId, studentId }) => ({
//         url: `test/start/${testId}`,
//         method: 'POST',
//         body: { studentId },
//       }),
//       invalidatesTags: ['Test'],
//     }),

//     // שליחת ציון לאחר סיום מבחן
//     submitScore: builder.mutation({
//       query: ({ testId, studentId, score }) => ({
//         url: `test/${testId}/submit-score`,
//         method: 'POST',
//         body: { testId, studentId, score },
//       }),
//       invalidatesTags: ['Test'],
//     }),

//     getTestScores: builder.query<TestScore[], string>({
//   query: (testId) => `/test/scores/${testId}`,
//   providesTags: ['Test'],
// }),


//   }),
// });

// export const {
//   useGetTestsByCourseForTeacherQuery,
//   useCreateTestMutation,
//   useGetTestsQuery,
//   useGetTestByIdQuery,
//   useGetTestsByCourseQuery,
//   useUpdateTestMutation,
//   useDeleteTestMutation,
//   useStartTestMutation,
//   useSubmitScoreMutation,
//   useGetTestScoresQuery,
//   useLazyGetTestByIdQuery
// } = testApi;

// export default testApi;

import apiSlice from './apiSlice';

export interface TestScore {
  testId: string;
  studentId: string;
  scores: number;
  submittedAt?: string;
  studentName?: string; // נוח לתצוגה בממשק
}

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


} = testApi;

export default testApi;
