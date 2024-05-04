import { apiService } from '../store/apiService';
0
export const helperService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getAllHelperByEventId: builder.query({
            query: (id) => `api/helper/${eventId}`,
            providesTags: ['helper'],
        }),
    }),

});

export const { useGetAllHelperByEventIdQuery} = helperService;
