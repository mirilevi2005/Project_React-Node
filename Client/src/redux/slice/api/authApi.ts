import { userInfo, SignInRequest, SignUpRequest, AuthResponse } from '../../../interface/authTypes'; // עדכני את הנתיב
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
  }),
});

export const { useSignInMutation, useSignUpMutation,useGoogleSignInMutation } = authApi;
export default authApi;
