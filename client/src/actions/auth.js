import * as api from '../api'

//Actions Creators
import { AUTH } from "../constants/actionTypes";

export const signin = (formData, history) => async (dispatch) => {
  try{
    const { data } = await api.signIn(formData);

    dispatch({type: AUTH, data: data});

    history.push('/');
  }catch(e){
    console.log(e);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try{
    const { data } = await api.signUp(formData);

    dispatch({type: AUTH, data: data});

    history.push('/');
  }catch(e){
    console.log(e);
  }
};
