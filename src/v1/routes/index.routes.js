import { Router } from "express";

const router = Router();

router
  .get("/", (req, res) => {
    res.render('index');
  })
  .get("/profile")
  .get("/timeline")
  .get("/settings");


export default router;