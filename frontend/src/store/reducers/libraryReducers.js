import {
    LIBRARIES_FETCH_INIT,
    LIBRARIES_FETCH_SUCCESS,
    LIBRARIES_FETCH_FAIL,
    LIBRARY_FETCH_INIT,
    LIBRARY_FETCH_SUCCESS,
    LIBRARY_FETCH_FAIL,
    LIBRARY_DELETE_REQUEST,
    LIBRARY_DELETE_SUCCESS,
    LIBRARY_DELETE_FAIL,
    LIBRARY_CREATE_REQUEST,
    LIBRARY_CREATE_SUCCESS,
    LIBRARY_CREATE_FAIL,
    LIBRARY_UPDATE_REQUEST,
    LIBRARY_UPDATE_SUCCESS,
    LIBRARY_UPDATE_FAIL,
    LIBRARY_RESET_REQUEST,
    LIBRARIES_TAG_FETCH_FAIL,
    LIBRARIES_TAG_FETCH_INIT,
    LIBRARIES_TAG_FETCH_SUCCESS
} from '../constants/libraryConstants.js';

export const libraryReducer = (state = {}, action) => {
    switch (action.type) {
        case LIBRARIES_FETCH_INIT:
            return { loading: true, ...state, libraries: [] };
        case LIBRARIES_FETCH_SUCCESS:
            return { ...state, loading: false, libraries: action.payload.libraries, pages: action.payload.pages, page: action.payload.page, total: action.payload.total };
        case LIBRARIES_FETCH_FAIL:
            return { ...state, loading: false, error: action.payload };
        case LIBRARIES_TAG_FETCH_INIT:
            return { loading: true, ...state, tags: [] };
        case LIBRARIES_TAG_FETCH_SUCCESS:
            return { ...state, loading: false, tags: action.payload.tags };
        case LIBRARIES_TAG_FETCH_FAIL:
            return { ...state, loading: false, error: action.payload };
        case LIBRARY_FETCH_INIT:
            return { loading: true, ...state };
        case LIBRARY_FETCH_SUCCESS:
            return { ...state, loading: false, library: action.payload };
        case LIBRARY_FETCH_FAIL:
            return { ...state, loading: false, error: action.payload };
        case LIBRARY_DELETE_REQUEST:
            return { loading: true, ...state };
        case LIBRARY_DELETE_SUCCESS:
            return { ...state, loading: false, libraries: state.libraries.filter(library => library._id !== action.payload) };
        case LIBRARY_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload };
        case LIBRARY_RESET_REQUEST:
            return { ...state, library: null }
        default:
            return state;
    }
}

export const libraryCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case LIBRARY_CREATE_REQUEST:
            return { loading: true, ...state };
        case LIBRARY_CREATE_SUCCESS:
            return { ...state, loading: false, libraries: state.libraries.push(action.payload) };
        case LIBRARY_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export const libraryUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case LIBRARY_UPDATE_REQUEST:
            return { loading: true, ...state };
        case LIBRARY_UPDATE_SUCCESS:
            return { ...state, loading: false, libraries: state.libraries.map(movie => movie._id === action.payload._id ? action.payload : movie) };
        case LIBRARY_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}