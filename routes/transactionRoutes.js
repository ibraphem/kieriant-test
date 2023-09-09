import express from "express";
import expressAsyncHandler from "express-async-handler";
import {
  getAgentById,
  getCreditAmount,
  getDebitAmount,
  getWalletDetails,
  saveTransaction,
  selfTransfer,
  validateAgentPin,
} from "../controllers/transactionController.js";
import { isAuth, saveOTPToRedis, verifyOtp } from "../utils.js";
import otpGenerator from "otp-generator";
import Transaction from "../models/transactionModel.js";
import { smsNotification } from "../services/NotificationService.js";

const transactionRoutes = express.Router();
transactionRoutes.post(
  "/move-funds",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    //Validate agent Transaction Pin
    const validatePin = await validateAgentPin(req.user?._id, req.body.pin);
    if (!validatePin) {
      return res
        .status(401)
        .send({ status: false, message: "Invalid Pin", data: null });
    }

    //Get and Validate Wallet address
    const findWallet = await getWalletDetails(req.body.walletAddress);
    if (!findWallet.status) {
      return res.status(404).send({
        status: false,
        message: "Wallet address does not exist",
        data: null,
      });
    }

    //Validate against self-transfer
    const selfPayment = await selfTransfer(
      req.user._id,
      req.body.walletAddress
    );
    if (selfPayment) {
      return res.status(403).send({
        status: false,
        message: "The wallet address you provided is yours",
        data: null,
      });
    }

    //Check Wallet Balance
    const credit = await getCreditAmount(req.user._id);
    const debit = await getDebitAmount(req.user._id);
    const walletBalance = credit - debit;
    if (req.body?.amount > walletBalance) {
      return res
        .status(403)
        .send({ status: false, message: "Insufficient balance", data: null });
    }

    //Save transaction as pending
    const newTransaction = await saveTransaction({
      agent: req.user._id,
      amount: req.body.amount,
      walletAddress: req.body.walletAddress,
    });
    if (newTransaction?.status) {
      //Generate and save OTP to Redis with expiration time of 5 mins
      const otp = otpGenerator.generate(4, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      console.log('otp', otp);
      const otpKey = newTransaction?.data?._id.toString()
      console.log('newTransaction', newTransaction);

      const pushOTPToRedis = await saveOTPToRedis(
        otpKey,
        otp,
        300
      );

      //Get Agent Details
      const agent = await getAgentById(req.user._id);

      //Send SMS to Agent
      let title = "Kieriant OTP Notification"
      let body = `Hi Agent: ${agent.agentId}\n Your account is about to be debitted with ${req.body.amount}. Verify Transaction with ${otp}`
    await smsNotification(agent.phone, title, body);
 
        return res
        .status(200)
        .send({ status: true, message: "Kindly provide the OTP sent to you to complete the transaction.", data: newTransaction });
    
    } else {
      return res.status(500).send(newTransaction);
    }

    //Send OTP
  })
);

transactionRoutes.post(
  "/complete-transaction",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    //Validate OTP
    const otpValidate = verifyOtp(req?.body?.transactionId, req.body.otp)

    if(otpValidate) {
        const transaction = await Transaction.findById(req?.body?.transactionId)
        transaction.status = "Completed"
        await transaction.save()

        return res
        .status(200)
        .send({ status: true, message: "Transaction sucessful", data: transaction });
    

    }else{
        return res
        .status(401)
        .send({ status: false, message: "Invalid OTP", data: null });
    }




    //Update Transaction
  })
);

export default transactionRoutes;
