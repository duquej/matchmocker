const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const template = require("./email-template.js");
const apiConfig = require("./APIConfig.js");

const transporter = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: apiConfig.config.sendGridAPI,
  })
);

function sendConfirmation(data, interviewerBool) {
  const mailOptions = {
    from: "MatchMocker <matchmockerservice@gmail.com>",
    to: interviewerBool === true ? data.accepter.email : data.email,
    subject: `MatchMocker Interview Confirmation`,
    html:
      interviewerBool === true
        ? template.generateConfirmationHTMLForAccepter(data)
        : template.generateConfirmationHTMLForRequester(data),
    headers: {
      "X-Entity-Ref-ID": null,
    },
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Message sent: %s", info.messageId);
        console.log(info.response);
        resolve();
      }
    });
  });
}

// send().catch(console.error);

module.exports = { sendConfirmation };
