const nodemailer = require("nodemailer");
const config = require("./auth.config")

const user = config.user
const pass = config.pass
const clientId = config.clientId
const clientSecret = config.clientSecret
const refreshToken = config.refreshToken

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        type: 'OAuth2',
        user: user,
        pass: pass,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken
    }
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for using VIVRE. Please confirm your email by clicking on the following link</p>
          <a href=https://vivretickets.com/confirm/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
};