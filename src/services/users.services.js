import User from "../models/User.js";

const getAllUsers = () => {
  const users = User.getAllUsers();
  return users;
};

const getOneUser = (id) => {
  const user = User.getOneUser(id);
  return user;
};

const createUser = (newUser) => {
  const user = User.createUser(newUser);
  return user;
};

const updateUser = (id, newUser) => {
  const user = User.updateUser(id, newUser);
  return user;
};

const deactiveUser = (id) => {
  const user = User.deactiveUser(id);
  return user;
};

const activeUser = (id) => {
  const user = User.activeUser(id);
  return user;
};

export default {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deactiveUser,
  activeUser,
};
