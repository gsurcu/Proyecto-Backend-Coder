const nodemailer = require('nodemailer')

const ADMIN_MAIL = process.env.ADMIN_MAIL

const ADMIN_PASS = process.env.ADMIN_PASS

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: ADMIN_MAIL,
    pass: ADMIN_PASS,
  }
});

let mailOptions = {
  to: 'gespejo121@gmail.com',
  subject: 'Mail de prueba desde Node.js',
  html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
}

const sendMail = async (options = mailOptions) =>{
  try {
    options.from = ADMIN_MAIL;
    const info = await transporter.sendMail(options);
    console.log(info)
  } catch (error) {
    console.log(error)
  }
}
module.exports = sendMail