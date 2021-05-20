/// How to add Action:
/// 1 - create action here
/// 1.5 - create api entry point if necessary
/// 2 - create const with dispatch type in ../constants folder
/// 3 - create redux in ../reducers folder to pass data in real time to all application
import * as api from '../api'

//Actions Creators
import {START_LOADING, END_LOADING, FETCH_POST, FETCH_ALL, FETCH_BY_SEARCH, CREATE, DELETE, UPDATE } from "../constants/actionTypes";

export const getPost = (id) => async (dispatch) => {
    try{
        dispatch({type:START_LOADING});
        const {data} = await api.fetchPost(id);
        dispatch({type: FETCH_POST, payload: data});
        dispatch({type: END_LOADING});
    }catch (e) {
        console.log(e);
    }
}

export const getPosts = (page) => async (dispatch) => {
    try{
        dispatch({type:START_LOADING});
        const {data} = await api.fetchPosts(page);
        dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING});
    }catch (e) {
        console.log(e);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try{
    dispatch({type:START_LOADING});
    const {data: { data }} = await api.fetchPostsBySearch(searchQuery);
    dispatch({type: FETCH_BY_SEARCH, payload: data});
    dispatch({type: END_LOADING});
  }catch(e){
    console.log(e);
  }
}

export const createPost = (post, history) => async (dispatch) =>{
    try{
      dispatch({type:START_LOADING});
        const { data } = await api.createPost(post);

        history.push(`/posts/${data._id}`);
        dispatch({type: CREATE, payload: data});
        dispatch({type: END_LOADING});
    }catch (e) {
        console.log(e);
    }
}

export const updatePost = (id, post, history) => async (dispatch) =>{
    try{
      dispatch({type:START_LOADING});
        const {data} = await api.updatePost(id, post);
        history.push(`/posts/${id}`);
        dispatch({type:   UPDATE, payload: data});
    }catch (e) {
        console.log(e);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id);

        dispatch({type: DELETE, payload: id});
    }catch (e) {
        console.log(e);
    }
}

export const likePost = (id) => async (dispatch) =>{
    try{
        const { data } = await api.likePost(id);

        dispatch({type: UPDATE, payload: data});
    }catch (e) {
        console.log(e);
    }
}
