import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include', 
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => '/user', 
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
      query: (nameCours) => `/stats/${nameCours}`, 
    }),
    getCourseStats: builder.query<{ studentsCount: number; videos: number }, void>({
      query: () => `/stats/`, 
    }),
  }),
});

export const { useGetUserProfileQuery, useCreateUserMutation ,useGetVideosCountQuery, useGetCourseStatsQuery} = apiSlice;

export default apiSlice;
