import { apiService } from '../store/apiService';

export const helperService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getAllHelperByEventId: builder.query({
            query: (eventId) => `api/helper/${eventId}`,
            providesTags: ['helper'],
        }),
    }),

});

export const { useGetAllHelperByEventIdQuery} = helperService;
