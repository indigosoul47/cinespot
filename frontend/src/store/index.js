import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "@redux-devtools/extension";
import { movieCreateReducer, movieReducer, movieUpdateReducer } from "./reducers/movieReducers";
import { userAdminReducer, userDetailsReducer, userReducer, userRegisterReducer, userUpdateReducer } from "./reducers/userReducers";
import { libraryCreateReducer, libraryReducer, libraryUpdateReducer } from "./reducers/libraryReducers";

const reducer = combineReducers({
    movies: movieReducer,
    libraries: libraryReducer,
    user: userReducer,
    userRegister: userRegisterReducer,
    profile: userDetailsReducer,
    userUpdates: userUpdateReducer,
    admin: combineReducers({
        user: userAdminReducer,
        movie: combineReducers({
            create: movieCreateReducer,
            update: movieUpdateReducer
        }),
        library: combineReducers({
            create: libraryCreateReducer,
            update: libraryUpdateReducer
        })
    })
});

const localUser = localStorage.getItem('userInfo') && (localStorage.getItem('userInfo') !== 'undefined') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    user: { userInfo: localUser }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;