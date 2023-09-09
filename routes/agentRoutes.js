import express from "express";
import expressAsyncHandler from "express-async-handler";
import {  signIn } from "../controllers/agentController.js";
import { validateSignIn } from "../services/ValidationService.js";


const agentRoutes = express.Router();
agentRoutes.post(
  "/signin",
  validateSignIn,
  expressAsyncHandler(async (req, res) => {
    const result = await signIn(req?.body);
    res.send(result)
  })
);


export default agentRoutes;
