import Agent from "../models/agentModel.js";
import bcrypt from "bcryptjs";
import Transaction from "../models/transactionModel.js";
import mongoose from "mongoose";

export const validateAgentPin = async (agentId, pin) => {
  const agent = await Agent.findById(agentId);
  if (bcrypt.compareSync(pin, agent.pin)) {
    return true;
  }

  return false;
};

export const getWalletDetails = async (walletAddress) => {
  const agent = await Agent.findOne({ walletAddress });
  if (agent) {
    return { status: true, message: "wallet Found", data: agent };
  } else {
    return { status: false, message: "no wallet Found", data: null };
  }
};

export const getAgentById = async (agentId) => {
  const agent = await Agent.findById(agentId);
  return agent;
};

export const selfTransfer = async (agentId, walletAddress) => {
  const agent = await Agent.findById(agentId);
  if (agent.walletAddress === walletAddress) {
    return true;
  }
  return false;
};

export const getCreditAmount = async (agentId) => {
  const agent = await Agent.findById(agentId);

  //Credit: Summation of amount entering the wallet
  const credit = await Transaction.aggregate([
    {
      $match: { walletAddress: agent.walletAddress, status: "Completed" },
    },
    {
      $group: {
        _id: null,
        amount: { $sum: "$amount" },
      },
    },
  ]);
  return credit[0]?.amount;
};

export const getDebitAmount = async (agentId) => {
  //Debit: Summation of completed transfer by agent
  const debit = await Transaction.aggregate([
    {
      $match: {
        status: "Completed",
        agent: new mongoose.Types.ObjectId(agentId),
      },
    },
    {
      $group: {
        _id: null,
        amount: { $sum: "$amount" },
      },
    },
  ]);

  return debit[0]?.amount;
};

export const saveTransaction = async (payload) => {
  const newTransaction = new Transaction(payload);
  try {
    const transaction = await newTransaction.save();
    return { status: true, message: "Transaction recorded", data: transaction };
  } catch (error) {
    return { status: false, message: "Transaction failed", data: error };
  }
};
