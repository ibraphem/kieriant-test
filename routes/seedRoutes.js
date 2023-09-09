import express from "express"
import {agents, transactions} from "../mock/data.js";
import Agent from "../models/agentModel.js";
import Transaction from "../models/transactionModel.js";


const seedRoutes = express.Router();

seedRoutes.get('/agents', async(req, res) => {

    await Agent.deleteMany()
    const createdAgents = await Agent.insertMany(agents)
    res.send({createdAgents})
})

seedRoutes.get('/transactions', async(req, res) => {

    await Transaction.deleteMany()
    const createdTransactions = await Transaction.insertMany(transactions)
    res.send({createdTransactions})
})




export default seedRoutes