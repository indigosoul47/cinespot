import axios from 'axios';
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
    MOVIE_UPDATE_REQUEST,
    MOVIE_CREATE_REQUEST,
    MOVIE_CREATE_SUCCESS,
    MOVIE_CREATE_FAIL,
    MOVIE_UPDATE_SUCCESS,
    MOVIE_UPDATE_FAIL,
    RELATED_MOVIES_INIT,
    RELATED_MOVIES_SUCCESS,
    RELATED_MOVIES_FAIL,
    MOVIES_TAG_FETCH_FAIL,
    MOVIES_TAG_FETCH_INIT,
    MOVIES_TAG_FETCH_SUCCESS
} from '../constants/movieConstants.js';

export const fetchTags = () => async (dispatch) => {
    try {
        dispatch({ type: MOVIES_TAG_FETCH_INIT });

        const { data } = await axios.get(`/api/movie/tags`);
        
        dispatch({
            type: MOVIES_TAG_FETCH_SUCCESS,
            payload: data
        });
    }catch (error){
        dispatch({
            type: MOVIES_TAG_FETCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const fetchMovies = (keyword = '', page = '', pSize = '', genre = '') => async (dispatch) => {
    try {
        dispatch({ type: MOVIES_FETCH_INIT });

        const { data } = await axios.get(`/api/movies?keyword=${keyword}&page=${page}${pSize !== '' ? `&pSize=${pSize}` : ''}&genre=${genre}`);
        
        dispatch({
            type: MOVIES_FETCH_SUCCESS,
            payload: data
        });
    }catch (error){
        dispatch({
            type: MOVIES_FETCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const searchMovies = (keyword = '', page = '', pSize = '', genre = '') => async (dispatch) => {
    try {
        dispatch({ type: MOVIES_FETCH_INIT });

        const { data } = await axios.get(`/api/movies/search?keyword=${keyword}&page=${page}${pSize !== '' ? `&pSize=${pSize}` : ''}&genre=${genre}`);
        
        dispatch({
            type: MOVIES_FETCH_SUCCESS,
            payload: data
        });
    }catch (error){
        dispatch({
            type: MOVIES_FETCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const fetchRelated = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: RELATED_MOVIES_INIT });

        const { data } = await axios.get(`/api/movies?keyword=${keyword}&page=1&pSize=3`);
        
        dispatch({
            type: RELATED_MOVIES_SUCCESS,
            payload: data.movies
        });
    }catch (error){
        dispatch({
            type: RELATED_MOVIES_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const fetchMovie = (id) => async (dispatch) => {
    try {
        dispatch({ type: MOVIE_FETCH_INIT });

        const { data } = await axios.get(`/api/movies/${id}`);
        
        dispatch({
            type: MOVIE_FETCH_SUCCESS,
            payload: data
        });
    }catch (error){
        dispatch({
            type: MOVIE_FETCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteMovie = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MOVIE_DELETE_REQUEST });

        const { userInfo } = getState().user;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/movies/${id}`, config);
        
        dispatch({
            type: MOVIE_DELETE_SUCCESS,
            payload: id
        });
    }catch (error){
        dispatch({
            type: MOVIE_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createMovie = (movie) => async (dispatch, getState) => {
    try {
        dispatch({ type: MOVIE_CREATE_REQUEST });

        const { userInfo } = getState().user;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/movies/`, movie, config);
        
        dispatch({
            type: MOVIE_CREATE_SUCCESS,
            payload: data
        });
    }catch (error){
        dispatch({
            type: MOVIE_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateMovie = (id, updates) => async (dispatch, getState) => {
    try {
        dispatch({ type: MOVIE_UPDATE_REQUEST });

        const { userInfo } = getState().user;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/movies/${id}`, updates, config);
        
        dispatch({
            type: MOVIE_UPDATE_SUCCESS,
            payload: data
        });
    }catch (error){
        dispatch({
            type: MOVIE_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}