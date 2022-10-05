import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/user/userSlice'

// redux persist

import storage from 'redux-persist/lib/storage';

import { persistReducer, persistStore } from 'redux-persist';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import thunk from 'redux-thunk';



const rootPersistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}

// const userPersistConfig = {
//     key: 'user',
//     storage,
//     stateReconciler: autoMergeLevel2
// }

const rootReducer = combineReducers({
    user: userReducer //persistReducer(userPersistConfig, userReducer)
    // 
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]


})

export const persistor = persistStore(store)
