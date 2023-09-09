import express from "express";
import expressAsyncHandler from "express-async-handler";
import {  signIn } from "../controllers/agentController.js";


const agentRoutes = express.Router();
agentRoutes.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const result = await signIn(req?.body);
    res.send(result)
  })
);


export default agentRoutes;
