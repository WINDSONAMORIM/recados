import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './modules/rootReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

//const persistConfig = {
//    key: 'appRecados',
//    storage,
//}

const persistedReducer = persistReducer({
    key: 'appRecados',
    //blacklist: ['user'],
    storage: storage
},
rootReducer);   

const store = configureStore({
    reducer: persistedReducer,
});    

const persistor = persistStore(store);

export{ store, persistor }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
