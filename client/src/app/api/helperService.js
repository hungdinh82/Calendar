import { apiService } from '../store/apiService';

export const helperService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getAllHelperByEventId: builder.query({
            query: (eventId) => `api/helper/${eventId}`,
            providesTags: ['helper'],
        }),
        getAllHelperAndCreatorByTodoId: builder.mutation({
            query: (id) => `api/helper/creator/${id}`,
            method: 'GET',
            providesTags: ['helper'],
        }),
    }),
});

export const { useGetAllHelperByEventIdQuery, useGetAllHelperAndCreatorByTodoIdMutation } = helperService;
