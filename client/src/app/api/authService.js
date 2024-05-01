import { apiService } from '../store/apiService';

export const AuthService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (data) => ({
                url: `api/user/signIn`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['user'],
        }),
        signUp: builder.mutation({
            query: (data) => ({
                url: `api/user/signUp`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['user'],
        }),
        getUserByMail: builder.query({
            query: (mail) => `api/user/${mail}`,
            providesTags: ['user'],
        }),
        getUserByMails: builder.query({
            query: (data) => ({
                url: `api/user/`,
                method: 'POST',
                body: data,
            }),
            providesTags: ['user'],
        }),
    }),
});

export const { useSignInMutation, useSignUpMutation, useGetUserByMailQuery, useGetUserByMailsQuery } = AuthService;
