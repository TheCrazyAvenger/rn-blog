import * as FileSystem from 'expo-file-system';
import { ADD_POST, LOAD_POSTS, REMOVE_POST, TOGGLE_BOOKED } from '../types';
import { DB } from '../../db';

export const loadPosts = () => {
  return async (dispatch) => {
    const posts = await DB.getPosts();
    dispatch({
      type: LOAD_POSTS,
      payload: posts,
    });
  };
};

export const removePost = (id) => async (dispatch) => {
  await DB.removePosts(id);

  dispatch({
    type: REMOVE_POST,
    payload: id,
  });
};

export const addPost = (post) => async (dispatch) => {
  const fileName = post.img.split('/').pop();
  const newPath = FileSystem.documentDirectory + fileName;

  try {
    await FileSystem.moveAsync({
      to: newPath,
      from: post.img,
    });
  } catch (e) {
    console.log(e);
  }

  const payload = { ...post, img: newPath };

  const id = await DB.createPost(payload);

  payload.id = id;

  dispatch({
    type: ADD_POST,
    payload,
  });
};

export const toggleBooked = (post) => async (dispatch) => {
  await DB.updatePosts(post);

  dispatch({
    type: TOGGLE_BOOKED,
    payload: post.id,
  });
};
