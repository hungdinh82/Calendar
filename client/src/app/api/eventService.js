import { apiService } from '../store/apiService';

export const eventService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getAllEvents: builder.query({
            query: () => `api/event/`,
            providesTags: ['event'],
        }),
        getEventById: builder.query({
            query: (id) => `api/event/${id}`,
            providesTags: ['event'],
        }),
        getTodosByTarget: builder.query({
            query: (targetId) => `api/event/target/${targetId}`,
            providesTags: ['event'],
        }),
        createEvent: builder.mutation({
            query: (data) => ({
                url: `api/event/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['event'],
        }),
        editEvent: builder.mutation({
            query: ({ id, data }) => ({
                url: `api/event/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['event'],
        }),
        deleteEvent: builder.mutation({
            query: (id) => ({
                url: `api/event/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['event'],
        }),
    }),
    
});

export const { useGetAllEventsQuery, useGetEventByIdQuery, useGetTodosByTargetQuery, useCreateEventMutation, useEditEventMutation, useDeleteEventMutation } = eventService;
