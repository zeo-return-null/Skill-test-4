import { Router } from "express";
import usersRoute from "./users.js";
// import loginRoute from "./login.js";
// import oauthRoute from "./oauth.js";
import registerRoute from "./register.js";
// import logoutRoute from "./logout.js";

//  RUTAS NO FUNCIONALES
// import citiesRoute from "./cities.js";
// import postsRoute from "./posts.js";

const router = Router();

router
  // .use("/oauth", oauthRoute)
  // .use("/auth/login", loginRoute)
  .use("/auth/register", registerRoute)
  // .use("/auth/logout", logoutRoute)
  .use("/users", usersRoute)
  // .use("/posts", postsRoute)
  // .use("/cities", citiesRoute);

export default router;
