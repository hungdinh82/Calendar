import { apiService } from '../store/apiService';

export const adminService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getAccounts: builder.query({
            query: () => 'api/admin',
        }),
        deleteAccount: builder.mutation({
            query: (id) => ({
                url: `api/admin/${id}`,
                method: 'DELETE',
            }),
        }),
        addAccount: builder.mutation({
            query: (account) => ({
                url: 'api/admin',
                method: 'POST',
                body: account,
            }),
        }),
        updateAccount: builder.mutation({
            query: (account) => ({
                url: `api/admin/${account.id}`,
                method: 'PUT',
                body: account,
            }),
        }),
    }),
});

export const { useGetAccountsQuery, useDeleteAccountMutation, useAddAccountMutation, useUpdateAccountMutation } = adminService;