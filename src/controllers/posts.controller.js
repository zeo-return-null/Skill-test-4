import service, { getOnePost } from "../services/posts.services";

export const getAllPosts = async (req, res) => {
  const posts = await service.getAllPosts();
  res.status(200).json(posts);
};

export const getOnePost = async (req, res) => {
  const post = await service.getOnePost(req.params.id);
  res.status(200).json(post);
};

export const createPost = async (req, res) => {
  if (!req.body.data) {
    return res.status(400).json({ msg: "No hay datos para el post" });
  };

  const newPost = {
    ...req.body
  }
  if (!newPost.body) {
    res.status(400).json({ message: "No podes crear un post vacio" });
  }
  const post = await service.createPost(req.body);
  res.status(201).json(post);
};

