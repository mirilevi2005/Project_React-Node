import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080', // ה-baseUrl שלך
    credentials: 'include', // אם יש צורך בשיתוף cookies
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => '/user', // שלח בקשה לנתיב של פרטי המשתמש
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: '/user',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),
    getVideosCount: builder.query<number, string>({
      query: (nameCours) => `/stats/${nameCours}`, // בשרת צריך לטפל בנתיב הזה ולהחזיר רק videosCount
    }),
    getCourseStats: builder.query<{ studentsCount: number; videos: number }, void>({
      query: () => `/stats/`, // מחזיר את שאר הנתונים עבור הקורס
    }),
  }),
});

export const { useGetUserProfileQuery, useCreateUserMutation ,useGetVideosCountQuery, useGetCourseStatsQuery} = apiSlice;

export default apiSlice;
