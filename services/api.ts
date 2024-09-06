import axios from 'axios';

export const getPosts = async () => {
    return await axios.get('https://jsonplaceholder.typicode.com/posts');
};

export const getUser = async (userId: number) => {
  return await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
};
