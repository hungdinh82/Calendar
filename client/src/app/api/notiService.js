import { apiService } from '../store/apiService';

export const notiService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotificationsByToMail: builder.query({
            query: (toMail) => `api/noti/${toMail}`,
            providesTags: ['notifications'],
        }),
        updateNotification: builder.mutation({
            query: ({ id, data }) => ({
                url: `api/noti/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['notifications'],
        }),
        deleteNotification: builder.mutation({
            query: (id) => ({
                url: `api/noti/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['notifications'],
        }),
    }),
    
});

export const { useGetAllNotificationsByToMailQuery, useUpdateNotificationMutation, useDeleteNotificationMutation } = notiService;
