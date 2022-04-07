import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    authReducer
} from "./reducers/auth";
import {
  contactReducer
} from "./reducers/contactReducer";

const reducer = combineReducers({
  login:authReducer,
  contactInfo:contactReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;