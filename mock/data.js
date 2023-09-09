import bcrypt from "bcryptjs";

export const agents = [
  {
    agentId: "dyher987612g",
    email: "ibraphem@gmail.com",
    phone: "+2347031259185",
    walletAddress: "y467475hft",
    password: bcrypt.hashSync("Password123"),
    pin: bcrypt.hashSync("1234"),
  },
  {
    agentId: "lo0w4987612g",
    email: "lowa@gmail.com",
    phone: "+2348167521881",
    walletAddress: "uiy5475hfm",
    password: bcrypt.hashSync("Password123"),
    pin: bcrypt.hashSync("4567"),
  },
  {
    agentId: "ajher9876129",
    email: "ajher@gmail.com",
    phone: "+2348081140955",
    walletAddress: "q46t4q75hfr",
    password: bcrypt.hashSync("Password123"),
    pin: bcrypt.hashSync("1890"),
  },
];

export const transactions = [
  {
    agent: "64fc2c120394421a3c33aa0d",
    amount: 100000,
    walletAddress: "y467475hft",
    status: "Completed",
  },
  {
    agent: "64fc2c120394421a3c33aa0c",
    amount: 20000,
    walletAddress: "q46t4q75hfr",
    status: "Completed",

  },
];
