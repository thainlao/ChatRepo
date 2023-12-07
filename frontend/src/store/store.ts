import authSlice from './reducers/authSlice';
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userServiceSlice from './reducers/userServiceSlice';

const rootReducer = combineReducers({
    authSlice, userServiceSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']