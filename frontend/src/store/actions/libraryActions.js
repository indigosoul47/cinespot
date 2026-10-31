import axios from 'axios';
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
    LIBRARY_UPDATE_REQUEST,
    LIBRARY_CREATE_REQUEST,
    LIBRARY_CREATE_SUCCESS,
    LIBRARY_CREATE_FAIL,
    LIBRARY_UPDATE_SUCCESS,
    LIBRARY_UPDATE_FAIL
} from '../constants/libraryConstants.js';

export const fetchLibraries = (keyword = '', page = '', pSize = '', genre = '') => async (dispatch) => {
    try {
        dispatch({ type: LIBRARIES_FETCH_INIT });

        const { data } = await axios.get(`/api/libraries?keyword=${keyword}&page=${page}${pSize !== '' ? `&pSize=${pSize}` : ''}&genre=${genre}`);
        
        dispatch({
            type: LIBRARIES_FETCH_SUCCESS,
            payload: data
        });
    }catch (error){
        dispatch({
            type: LIBRARIES_FETCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const fetchLibrary = (id) => async (dispatch) => {
    try {
        dispatch({ type: LIBRARY_FETCH_INIT });

        const { data } = await axios.get(`/api/libraries/${id}`);
        
        dispatch({
            type: LIBRARY_FETCH_SUCCESS,
            payload: data
        });
    }catch (error){
        dispatch({
            type: LIBRARY_FETCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteLibrary = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: LIBRARY_DELETE_REQUEST });

        const { userInfo } = getState().user;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/libraries/${id}`, config);
        
        dispatch({
            type: LIBRARY_DELETE_SUCCESS,
            payload: id
        });
    }catch (error){
        dispatch({
            type: LIBRARY_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const addLibrary = (movie) => async (dispatch, getState) => {
    try {
        dispatch({ type: LIBRARY_CREATE_REQUEST });

        const { userInfo } = getState().user;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/libraries/`, movie, config);
        
        dispatch({
            type: LIBRARY_CREATE_SUCCESS,
            payload: data
        });
    }catch (error){
        dispatch({
            type: LIBRARY_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateLibrary = (id, updates) => async (dispatch, getState) => {
    try {
        dispatch({ type: LIBRARY_UPDATE_REQUEST });

        const { userInfo } = getState().user;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/movies/${id}`, updates, config);
        
        dispatch({
            type: LIBRARY_UPDATE_SUCCESS,
            payload: data
        });
    }catch (error){
        dispatch({
            type: LIBRARY_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}