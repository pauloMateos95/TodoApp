import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { todoReducer } from "./todoReducer";
import { uiReducer } from "./uiReducer";



export const rootReducer = combineReducers({
    ui: uiReducer,
    todo: todoReducer,
    auth: authReducer
})