import jwt from "jsonwebtoken";
import { redisClient } from "./server.js";



export const generateToken = (user) => {
    return jwt.sign(
      {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
  };

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length);
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          res
            .status(401)
            .send({ status: false, message: "Invalid Token", data: null });
        } else {
          req.user = decode;
          next();
        }
      });
    } else {
      res.status(401).send({ status: false, message: "No Token", data: null });
    }
  };

export const saveOTPToRedis = async(otpKey, otpValue, expirySeconds) => {
  try {
    await redisClient.set(otpKey, otpValue, 'EX', expirySeconds);
    return true;
  } catch (error) {
    console.error(`Error saving OTP to Redis: ${error}`);
    return false;
  }
}

export const verifyOtp = async(otpKey, userInputOTP) => {
  try {
    const storedOTP = await redisClient.get(otpKey);
    if (storedOTP && storedOTP === userInputOTP) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Error verifying OTP: ${error}`);
    return false;
  }
}


