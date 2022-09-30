import service from "../services/users.services.js";
import { avatarRegex, emailRegex, phoneRegex } from "../utils/regex.js";
import { uniqueID } from "../utils/uniqueID.js";
import bcrypt from "bcrypt";

const getAllUsers = async (req, res) => {
  const users = await service.getAllUsers();
  users
    ? res.status(200).json({ message: "success", data: users })
    : res.status(400).json({ message: "error trying to get users from db" });
};

const getOneUser = async (req, res) => {
  const user = await service.getOneUser(req.params.id);
  user
    ? res.status(200).json({ message: "success", data: user })
    : res
        .status(400)
        .json({ message: "error trying to get requested user from db" });
};

const createUser = async (req, res) => {
  const {
    name,
    surname,
    email,
    password,
    avatar,
    birthdate,
    pronouns,
    nationality,
    residence,
    phone,
    description,
    actualJob,
    status,
    language_id,
    country_id,
    state_id,
    city_id,
    organization_id,
  } = req.body;

  if (!name || !surname) {
    return res.status(400).send("Name and surname required");
  }

  if (!email || !password) {
    return done(null, false, {
      message: "You must enter an email and password to register",
    });
  }

  if (phone) {
    if (!phoneRegex.test(phone)) {
      return res.status(400).send("Phone number invalid");
    }
  }
  
    if (!emailRegex.test(email) || !avatarRegex.test(avatar)) {
      return res.status(400).json({
        message: "Please provide valid email and avatar",
      });
    }

  const newUser = {
    name,
    surname,
    email,
    avatar,
    birthdate,
    pronouns,
    nationality,
    residence,
    phone,
    description,
    actualJob,
    status,
  };

  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);

  newUser.id = uniqueID();
  newUser.password = hashedPassword;

  const createdNewUser = await service.createUser(newUser);

  res.status(200).json(createdNewUser);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    surname,
    email,
    password,
    avatar,
    birthdate,
    pronouns,
    nationality,
    residence,
    phone,
    description,
    actualJob,
    status,
    language_id,
    country_id,
    state_id,
    city_id,
    organization_id,
  } = req.body;

  if (email) {
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email");
    }
  }

  if (avatar) {
    if (!avatarRegex.test(avatar)) {
      return res.status(400).send("Invalid avatar");
    }
  }

  if (phone) {
    if (!phoneRegex.test(phone)) {
      return res.status(400).send("Invalid phone number");
    }
  }

  if (birthdate) {
    if (!dateRegex.test(birthdate)) {
      return res.status(400).send("Invalid birthdate");
    }
  }

  const newData = {
    name,
    surname,
    email,
    avatar,
    birthdate,
    pronouns,
    nationality,
    residence,
    phone,
    description,
    actualJob,
    status,
  };
  
  if (language_id) {
    if (!intRegex.test(language_id)) {
      return res.status(400).send("invalid lang id");
    }
    newUser.language_id = Number(language_id);
  }
  if (country_id) {
    if (!intRegex.test(country_id)) {
      return res.status(400).send("invalid country id");
    }
    newUser.country_id = Number(country_id);
  }
  if (state_id) {
    if (!intRegex.test(state_id)) {
      return res.status(400).send("invalid state id");
    }
    newUser.state_id = Number(state_id);
  }
  if (city_id) {
    if (!intRegex.test(city_id)) {
      return res.status(400).send("invalid city id");
    }
    newUser.city_id = Number(city_id);
  }
  if (organization_id) {
    if (!intRegex.test(organization_id)) {
      return res.status(400).send("invalid organization id");
    }
    newUser.organization_id = Number(organization_id);
  }

  if (password) {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);
    newData.password = hashedPassword;
  }

  const updatedUser = await service.updateUser(id, newData);
  res.status(200).json(updatedUser);
};

const deactiveUser = async (req, res) => {
  const user = await service.deactiveUser(req.params.id);
  res.status(200).json(user);
};

const activeUser = async (req, res) => {
  const user = await service.activeUser(req.params.id);
  res.status(200).json(user);
};

export default {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deactiveUser,
  activeUser,
};
