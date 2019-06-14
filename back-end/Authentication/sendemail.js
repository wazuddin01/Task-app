const nodemailer = require("nodemailer");

module.exports = async (firstName, token, email) => {
  let output = `
    <h1 style="color:red;">Welcome ${firstName}</h1>
    <h4 style="color:blue">Please verify your Account</h4> 
    <a href="${token}">Verify</a>
    `;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "taskappforeverybody@gmail.com", // generated ethereal user
      pass: "Wazu.ruhail@1998" // generated ethereal password
    }
    // tls: {
    //   rejectUnauthorized: false
    // }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Task App" <taskApp@test.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Verify Email", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  });
  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // return res.status(201).json({ token, succ: "email has been sent" });
};
