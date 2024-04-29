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
    }),
});

export const { useSignInMutation, useSignUpMutation } = AuthService;
