import {  SignInRequest, SignUpRequest, AuthResponse } from '../../../interface/authTypes'; // עדכני את הנתיב
import apiSlice from './apiSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, SignInRequest>({
      query: (credentials) => ({
        url: '/',
        method: 'POST',
        body: credentials,
      }),
    
      invalidatesTags: ['User'],
    }),
    signUp: builder.mutation<AuthResponse, SignUpRequest>({
      query: (newUser) => ({
        url: '/signup',
        method: 'POST',
        body: newUser,

      }),
      invalidatesTags: ['User'],
    }),
    googleSignIn: builder.mutation<AuthResponse, { email: string; userName: string }>({
      query: (googleUser) => ({
        url: "/google-login",
        method: "POST",
        body: googleUser,

      }),
      
      invalidatesTags: ["User"],
    }),

forgotPassword: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: "/forgot-password",
        method: "POST",
        body,
      }),
    }),
    verifyTempPassword: builder.mutation<
      { success: boolean; token: string; role: string; email: string },
      { email: string; tempPassword: string }
    >({
      query: (body) => ({
        url: "/verify-temp-password",
        method: "POST",
        body,
      }),
    }),
    changePassword: builder.mutation<void, { email: string; newPassword: string }>({
      query: (body) => ({
        url: "/change-password",
        method: "POST",
        body,
      }),
    }),
   
  }),
});

export const { useSignInMutation, useSignUpMutation,useGoogleSignInMutation,useForgotPasswordMutation,useChangePasswordMutation,useVerifyTempPasswordMutation } = authApi;
export default authApi;
