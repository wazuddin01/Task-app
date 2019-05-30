const sgMail = require("@sendgrid/mail");
//const sgKey = require("../config/keys").sgKey;
const sgKey =
  "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";
sgMail.setApiKey(sgKey);
const msg = {
  to: "wazuddin02@gmail.com",
  from: "Wazuddin@gmail.com",
  subject: "Verify Email",
  text: "and easy to do anywhere, even with Node.js",
  html: ``
};
sgMail.send(msg);
