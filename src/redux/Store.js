import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ContactReducer } from "./Reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const rootReducer = combineReducers({ contact: ContactReducer });

const contactStore = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger],
});

export default contactStore;
