import {
    MOVIES_FETCH_INIT,
    MOVIES_FETCH_SUCCESS,
    MOVIES_FETCH_FAIL,
    MOVIE_FETCH_INIT,
    MOVIE_FETCH_SUCCESS,
    MOVIE_FETCH_FAIL,
    MOVIE_DELETE_REQUEST,
    MOVIE_DELETE_SUCCESS,
    MOVIE_DELETE_FAIL,
    MOVIE_CREATE_REQUEST,
    MOVIE_CREATE_SUCCESS,
    MOVIE_CREATE_FAIL,
    MOVIE_UPDATE_REQUEST,
    MOVIE_UPDATE_SUCCESS,
    MOVIE_UPDATE_FAIL,
    MOVIE_RESET_REQUEST,
    RELATED_MOVIES_INIT,
    RELATED_MOVIES_SUCCESS,
    RELATED_MOVIES_FAIL,
    MOVIES_TAG_FETCH_FAIL,
    MOVIES_TAG_FETCH_INIT,
    MOVIES_TAG_FETCH_SUCCESS
} from '../constants/movieConstants.js';

export const movieReducer = (state = {}, action) => {
    switch (action.type) {
        case MOVIES_FETCH_INIT:
            return { loading: true, ...state, movies: [] };
        case MOVIES_FETCH_SUCCESS:
            return { ...state, loading: false, movies: action.payload.movies, pages: action.payload.pages, page: action.payload.page, total: action.payload.total };
        case MOVIES_FETCH_FAIL:
            return { ...state, loading: false, error: action.payload };
        case MOVIES_TAG_FETCH_INIT:
            return { loading: true, ...state, tags: [] };
        case MOVIES_TAG_FETCH_SUCCESS:
            return { ...state, loading: false, tags: action.payload.tags };
        case MOVIES_TAG_FETCH_FAIL:
            return { ...state, loading: false, error: action.payload };
        case RELATED_MOVIES_INIT:
            return { loadingRelated: true, ...state, related: [] };
        case RELATED_MOVIES_SUCCESS:
            return { ...state, loadingRelated: false, related: action.payload };
        case RELATED_MOVIES_FAIL:
            return { ...state, loadingRelated: false, error: action.payload };
        case MOVIE_FETCH_INIT:
            return { loading: true, ...state };
        case MOVIE_FETCH_SUCCESS:
            return { ...state, loading: false, movie: action.payload };
        case MOVIE_FETCH_FAIL:
            return { ...state, loading: false, error: action.payload };
        case MOVIE_DELETE_REQUEST:
            return { loading: true, ...state };
        case MOVIE_DELETE_SUCCESS:
            return { ...state, loading: false, movies: state.movies.filter(movie => movie._id !== action.payload) };
        case MOVIE_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload };
        case MOVIE_RESET_REQUEST:
            return { ...state, movie: null }
        default:
            return state;
    }
}

export const movieCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case MOVIE_CREATE_REQUEST:
            return { loading: true, ...state };
        case MOVIE_CREATE_SUCCESS:
            return { ...state, loading: false, movies: state.movies.push(action.payload) };
        case MOVIE_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export const movieUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case MOVIE_UPDATE_REQUEST:
            return { loading: true, ...state };
        case MOVIE_UPDATE_SUCCESS:
            return { ...state, loading: false, movies: state.movies.map(movie => movie._id === action.payload._id ? action.payload : movie) };
        case MOVIE_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}