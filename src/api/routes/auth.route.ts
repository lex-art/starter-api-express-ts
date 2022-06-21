import { Router } from "express";
import AuthController from "../controllers/Auth/Auth.Controller";

const auth: Router = Router();

auth.post("/register", AuthController.register);

export default auth;