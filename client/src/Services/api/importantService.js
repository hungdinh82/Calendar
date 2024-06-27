import { apiService } from '../store/apiService';

export const importantService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getImportantsByUserId: builder.query({
            query: (userId) => `api/important/${userId}`,
            providesTags: ['importants'],
        }),
        getImportantByEventIdUserId: builder.query({
            query: ({ eventId, userId }) => `api/important/${eventId}/${userId}`,
            providesTags: ['importants'],
        }),
        updateImportant: builder.mutation({
            query: ({ eventId, userId }) => ({
                url: `api/important/${eventId}/${userId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['importants'],
        }),
    }),
});

export const { useGetImportantsByUserIdQuery, useUpdateImportantMutation, useGetImportantByEventIdUserIdQuery } = importantService;
