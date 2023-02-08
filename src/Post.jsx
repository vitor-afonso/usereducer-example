import axios from 'axios';
import { useReducer, useState } from 'react';
import { ACTION_TYPES } from './postActionTypes';
import { INITIAL_STATE, postReducer } from './postReducer';

// USING USESTATE
/* const Post = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState({});

  const handleFetch = async () => {
    setLoading(true);
    setError(false);
    try {
      let response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');

      setLoading(false);
      setPost(response.data);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div>
      <button onClick={handleFetch}>{loading ? 'Wait...' : 'Fetch the post'}</button>
      <p>{post?.title}</p>
      <span>{error && 'Something went wrong!'}</span>
    </div>
  );
}; */

// USING USEREDUCER
const Post = () => {
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

  const handleFetch = async () => {
    dispatch({ type: ACTION_TYPES.FETCH_START });

    try {
      let res = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: ACTION_TYPES.FETCH_ERROR });
    }
  };

  return (
    <div>
      <button onClick={handleFetch}>{state.loading ? 'Wait...' : 'Fetch the post'}</button>
      <p>{state.post?.title}</p>
      <span>{state.error && 'Something went wrong!'}</span>
    </div>
  );
};

export default Post;
