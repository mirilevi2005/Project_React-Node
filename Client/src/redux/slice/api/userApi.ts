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
      providesTags: ['User'],
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: '/user',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUserProfileQuery, useCreateUserMutation } = apiSlice;

export default apiSlice;
