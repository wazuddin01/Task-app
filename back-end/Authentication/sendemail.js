const nodemailer = require("nodemailer");

module.exports = async (firstName, token, email, forget) => {
  let output;
  if (forget) {
    output = `
    <h1 style="color:yellow;">Hello ${firstName}</h1>
    <h4 style="color:orange">Follow the link to change password</h4> 
    <a href="${token}">Change Password</a>
    `;
  } else {
    output = `
    <h1 style="color:green;">Welcome ${firstName}</h1>
    <h4 style="color:blue">Please verify your Account</h4> 
    <a href="${token}">Verify</a>
    `;
  }

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "taskappforeverybody@gmail.com", // generated ethereal user
      pass: "Wazu.ruhail@1998" // generated ethereal password
    }
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Task App" <taskApp@test.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Verify Email", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  });
};
