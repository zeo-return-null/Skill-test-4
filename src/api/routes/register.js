import { Router } from "express";
import passport from "passport";

const router = Router();

router
  .get("/", (req, res) => {
    res.render("register");
  })
  .get("/error", (req, res) => {
    const { error } = req.flash();
    if (error) {
      res.render("error", {
        message: "Error al registrarse",
        error: error[0],
      });
    } else {
      res.render("error", {
        message: "Error al registrarse",
        error: "Algo malio sal",
      });
    }
  })
  .post(
    "/",
    passport.authenticate("local-register", {
      successRedirect: "/profile",
      failureRedirect: "/api/auth/register/error",
      failureFlash: true,
      passReqToCallback: true,
    })
  );

export default router;
