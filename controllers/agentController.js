import Agent from "../models/agentModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";


export const signIn = async (payload) => {
    try {
      const agent = await Agent.findOne({ email: payload?.email });
      if (agent) {
      
        if (bcrypt.compareSync(payload?.password, agent.password)) {
          return {
            status: true,
            message: "Agent logged in successfully",
            data: {
                _id: agent.id,
                agent: agent.agentId,
                phone: agent.phone,
                email: agent.email,
                token: generateToken(agent),
              },
          };
        } else {
          return { status: false, message: "Incorrect Credentials", data: null };
        }
      } else {
        return { status: false, message: "Agent Not found", data: null };
      }
    } catch (error) {
      return { status: false, message: error?.message, data: error };
    }
  };