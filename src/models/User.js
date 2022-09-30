import { PrismaClient } from "@prisma/client";
import { client } from "../middleware/redis.client.js";

const prisma = new PrismaClient();

async function getAllUsers() {
  const reply = await client.get("users");
  if (reply) return JSON.parse(reply);

  const users = await prisma.user.findMany({
    include: {
      city: true,
			comment: true,
			hobby: true,
			language: true,
			country: true,
			post: true,
			state: true,
    },
  });

  await client.set("users", JSON.stringify(users), { EX: 360 });

  return users;
}

async function getOneUser(id) {
  const reply = await client.get(`users/${id}`);
  if (reply) return JSON.parse(reply);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      comment: true,
      language: true,
      hobby: true,
      post: true,
      country: true,
      state: true,
      city: true,
    },
  });
  await client.set(`users/${id}`, JSON.stringify(user), { EX: 360 });
  
  return user;
}

async function createUser(data) {
    const createdUser = await prisma.user.create({
      data: data,
      include: {
        comment: true,
        language: true,
        hobby: true,
        post: true,
        city: true,
        state: true,
        country: true
      }
    });
    
    await client.del("users");

    return createdUser;
}

async function updateUser(id, data) {
  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: data,
  });

  await client.del("users");
  await client.del(`users/${id}`);

  return updatedUser;
}

async function activeUser(id) {
  const activeUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      active: 1,
    },
  });

  await client.del("users");
  await client.del(`users/${id}`);

  return activeUser;
}

async function deactiveUser(id) {
  const deactiveUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      active: 0,
    },
  });

  await client.del("users");
  await client.del(`users/${id}`);
  
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
