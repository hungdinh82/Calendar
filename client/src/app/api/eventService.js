import { apiService } from '../store/apiService';

export const eventService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getAllEventsByCurrentUser: builder.query({
            query: (id) => `api/event/currentUser/${id}`,
            providesTags: ['event'],
        }),
        getAllEventsTargetsByCurrentUser: builder.query({
            query: (id) => `api/event/getTargets/currentUser/${id}`,
            providesTags: ['event'],
        }),
        getAllTodoByTargetId: builder.query({
            query: (targetId) =>  `api/event/target/${targetId}/todos`,
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
        editTarget: builder.mutation({
            query: ({ id, data }) => ({
                url: `api/event/editTarget/${id}`,
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

export const { useGetAllEventsByCurrentUserQuery, useGetAllEventsTargetsByCurrentUserQuery, useGetAllTodoByTargetIdQuery, useGetEventByIdQuery, useGetTodosByTargetQuery, useCreateEventMutation, useEditEventMutation, useEditTargetMutation, useDeleteEventMutation } = eventService;
