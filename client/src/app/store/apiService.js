import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {backEndHost} from '../../config/config.js';

export const apiService = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: backEndHost.url }),
    tagTypes: ['user',  'event'],
    endpoints: (builder) => ({}),
});
