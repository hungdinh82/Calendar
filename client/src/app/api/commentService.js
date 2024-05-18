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
        getCommentByEventId: builder.query({
            query: (eventId) => `api/comment/${eventId}`,
            providesTags: ['comment'],
        }),
    }),
});

export const { useAddCommentMutation, useGetCommentByEventIdQuery } = commentService;
