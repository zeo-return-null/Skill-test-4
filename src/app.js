import express from "express";
import session from "express-session";
import passport from "passport";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { SESSION_SECRET } from './config.js';

// Import de Rutas
import indexRoute from "./v1/routes/index.routes.js";
import apiRoute from "./api/routes/index.js";

const app = express();

// Configurar vistas
app.set(
  "views",
  path.join(path.dirname(fileURLToPath(import.meta.url)), "/views")
  );
  app.set("view engine", "ejs");
  
  // Inicializaciones
app.use(morgan("dev"));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));


// session
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use("/api/", apiRoute);
app.use("/", indexRoute);

export default app;
