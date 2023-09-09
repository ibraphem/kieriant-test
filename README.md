# kieriant-test

#Stack: Nodejs, Express and MongoDB

#Other tools: Redis & @trycourier/courier

#Contains the following API routes:
  #. api/agent/signin: This route handles agent login and generates token for secure API calls
  #. api/transaction/move-funds: This initiate funds transfer, validate transfer condition, pin authentication, redis otp storage, verification and send OTP with trycourier
  #. api/transaction/complete-transaction: It validates OTP and complete fund transfer
  
