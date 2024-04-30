import { apiService } from '../store/apiService';

export const commentService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        addComment: builder.mutation({
            query: (data) => ({
                url: `api/comment/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['comment'],
        }),
        getComment: builder.query({
            query: () => `api/comment/`,
            providesTags: ['comment'],
        }),
    }),
});

export const { useAddCommentMutation, useGetCommentQuery } = commentService;
