import { RECEIVE_POSTS, REMOVE_POST, UPDATE_POST } from '../actions/posts_actions';
import merge from 'lodash/merge';

const postsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;
  switch(action.type) {
    case RECEIVE_POSTS:
      newState = merge({}, oldState, action.posts);
      return newState;
    case UPDATE_POST:
      newState = merge({}, oldState);
      delete newState[Object.keys(action.post)[0]];
      newState = merge({}, newState, action.post);
      return newState;
    case REMOVE_POST:
      newState = merge({}, oldState);
      const ids = Object.keys(action.post);
      delete newState[ids[0]];
      return newState;
    default:
      return oldState;
  }
};

export default postsReducer;