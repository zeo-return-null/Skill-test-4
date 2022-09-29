import { PrismaClient } from "@prisma/client";
import { client } from "../middleware/redis.client.js";

const prisma = new PrismaClient();

async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

async function getOneUser(email) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        comment: true,
        language: true,
        country: true,
        state: true,
        city: true,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function createUser(data) {
  try {
    const createdUser = await prisma.user.create({
      data: data,
    });
    return createdUser;
  } catch (error) {
    console.log(error);
  }
}

async function updateUser(id, data) {
  try {
    const updatedUser = await prisma.user.updateOne({
      where: {
        id: id,
      },
      data: data,
    });
    return updatedUser;
  }
  catch (error) {
    console.log(error)
  }
}

async function activeUser(id) {
  const activeUser = await prisma.user.updateOne({
    where: {
      id: id,
    },
    data: {
      active: true,
    },
  });
  return activeUser;
}

async function deactiveUser(id) {
  const deactiveUser = await prisma.user.updateOne({
    where: {
      id: id,
    },
    data: {
      active: false,
    },
  });
  return deactiveUser;
}

export default {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  activeUser,
  deactiveUser,
};
