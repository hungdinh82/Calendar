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
        getCreatorById: builder.query({
            query: (userId) => `api/user/creator/${userId}`,
            providesTags: ['user'],
        }),
    }),
});

export const { useSignInMutation, useSignUpMutation, useGetUserByMailQuery,  useGetCreatorByIdQuery } = AuthService;
