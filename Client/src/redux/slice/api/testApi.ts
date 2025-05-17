

import apiSlice from './apiSlice';  // שמור על ה-import של apiSlice

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
      query: (id) => `/test/${id}`, // תוקן ה-URL
      providesTags: ['Test'],
    }),
    getTestsByCourse: builder.query({
      query: (courseName) => `/test/course/${courseName}`, // ברור יותר
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
        url: `/student-submissions/start/${testId}`,
        method: 'POST',
        body: { studentId },
      }),
      invalidatesTags: ['Test'],
  }),
  })
});

export const {
  useCreateTestMutation,
  useGetTestsQuery,
  useGetTestByIdQuery,
  useGetTestsByCourseQuery,
  useUpdateTestMutation,
  useDeleteTestMutation,
  useStartTestMutation
} = testApi;

export default testApi;
