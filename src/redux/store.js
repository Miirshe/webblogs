import { configureStore } from "@reduxjs/toolkit";
import AuthSlices from "./slices/AuthSlices";
export const store = configureStore({
    reducer : {
        auth : AuthSlices
    }
})