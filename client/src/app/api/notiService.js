import { apiService } from '../store/apiService';

export const notiService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        addNotification: builder.mutation({
            query: (data) => ({
                url: `api/noti/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['notifications'],
        }),
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

export const { useAddNotificationMutation, useGetAllNotificationsByToMailQuery, useUpdateNotificationMutation, useDeleteNotificationMutation } = notiService;
