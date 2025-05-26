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
     getStats: builder.query<{ studentsCount: number; videosCount: number }, void>({
      query: () => '/stats',
    }),
  }),
});

export const { useGetUserProfileQuery, useCreateUserMutation ,useGetStatsQuery} = apiSlice;

export default apiSlice;
