import Post from '../models/Post.js';

export const getAllPosts = () => {
  const posts = Post.getAllPosts();
  return posts;
};

export const getOnePost = (id) => {
  const post = Post.getOnePost(id);
  return post;
};

export const createPost = (data) => {
  const createdPost = Post.createPost(data);
  return createdPost;
};

export const updatePost = (id, data) => {
  const updatedPost = Post.updatePost(id, data);
  return updatedPost;
};
