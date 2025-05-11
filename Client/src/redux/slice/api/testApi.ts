import apiSlice from './apiSlice';  // שמור על ה-import של apiSlice

const testApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTest: builder.mutation({
      query: (testData) => ({
        url: '/test',
        method: 'POST',
        body: testData, // הנתונים שישלחו בקשה
      }),
      invalidatesTags: ['Test'], // עדכון הטאג
    }),
    getTests: builder.query({
      query: () => '/test', // קריאה לקבלת כל המבחנים
      providesTags: ['Test'], // חזרה עם טאג עבור המבחנים
    }),
    getTestById: builder.query({
      query: (id) => `/test${id}`, // קריאה לקבלת מבחן לפי ID
      providesTags: ['Test'],
    }),
     getTestsByCourse: builder.query({
  query: (courseName) => `/test/${courseName}`,
  providesTags: ['Test'],
}),
  }),

});

export const { useCreateTestMutation, useGetTestsQuery, useGetTestByIdQuery,useGetTestsByCourseQuery } = testApi;
export default testApi;
