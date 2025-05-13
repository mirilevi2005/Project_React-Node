// import apiSlice from './apiSlice';  // שמור על ה-import של apiSlice

// const testApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     createTest: builder.mutation({
//       query: (testData) => ({
//         url: '/test',
//         method: 'POST',
//         body: testData, // הנתונים שישלחו בקשה
//       }),
//       invalidatesTags: ['Test'], // עדכון הטאג
//     }),
//     getTests: builder.query({
//       query: () => '/test', // קריאה לקבלת כל המבחנים
//       providesTags: ['Test'], // חזרה עם טאג עבור המבחנים
//     }),
//     getTestById: builder.query({
//       query: (id) => `/test${id}`, // קריאה לקבלת מבחן לפי ID
//       providesTags: ['Test'],
//     }),
//      getTestsByCourse: builder.query({
//   query: (courseName) => `/test/${courseName}`,
//   providesTags: ['Test'],
// }),
//   }),

// });

// export const { useCreateTestMutation, useGetTestsQuery, useGetTestByIdQuery,useGetTestsByCourseQuery } = testApi;
// export default testApi;


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
<<<<<<< HEAD
      query: () => '/test', // קריאה לקבלת כל המבחנים
      providesTags: ['Test'], // חזרה עם טאג עבור המבחנים
    }),
    getTestById: builder.query({
      query: (id) => `/test/${id}`, // קריאה לקבלת מבחן לפי ID
      providesTags: ['Test'],
    }),
     getTestsByCourse: builder.query({
  query: (courseName) => `/test/${courseName}`,
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

=======
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
        method: 'PUT', // או 'PATCH' לפי מה שתומך השרת
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
>>>>>>> dd26239c2f8139194221207cd52f4aa6d2159f56
  }),
});

<<<<<<< HEAD
export const { useCreateTestMutation, useGetTestsQuery, useGetTestByIdQuery,useGetTestsByCourseQuery ,useUpdateTestMutation,
useDeleteTestMutation,} = testApi;
=======
export const {
  useCreateTestMutation,
  useGetTestsQuery,
  useGetTestByIdQuery,
  useGetTestsByCourseQuery,
  useUpdateTestMutation,
  useDeleteTestMutation,
} = testApi;

>>>>>>> dd26239c2f8139194221207cd52f4aa6d2159f56
export default testApi;
