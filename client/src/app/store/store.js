import { configureStore } from '@reduxjs/toolkit';
import { apiService } from './apiService';
import socketSlice from "../../redux/socketSlice";
const rootReducer = {
    [apiService.reducerPath]: apiService.reducer,
    socket: socketSlice
};

// const persistConfig = {
//     key: 'root',
//     // storage,
//     whitelist: ['comment', 'user_current', 'socket'],
// };

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }).concat(apiService.middleware),
});

// export const persistor = persistStore(store);
export default store;
