import { configureStore } from '@reduxjs/toolkit';
import { apiService } from './apiService';
const rootReducer = {
    [apiService.reducerPath]: apiService.reducer,
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
});

export default store;
