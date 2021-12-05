"use strict";
const nodemailer = require("nodemailer");



var cron = require('node-cron');

cron.schedule('* * * * * *', () => {
  

  let testAccount = nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "mth65k@gmail.com", // generated ethereal user
      pass: "sayeed@39", // generated ethereal password
    },
  });

  let info = transporter.sendMail({
    from: 'mth65k@gmail.com', // sender address
    to: "sayeedanwar2061@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...



});