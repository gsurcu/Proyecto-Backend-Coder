const nodemailer = require('nodemailer')

const TEST_MAIL = 'gespejo121@gmail.com'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: 'mqjumqwfroxmgqai'
  }
});

const mailOptions = {
  from: 'Servidor Node.js',
  to: 'gabrieltomas00@hotmail.com',
  subject: 'Mail de prueba desde Node.js',
  html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
}

const mail = async () =>{
  try {
    const info = await transporter.sendMail(mailOptions)
    console.log(info)
  } catch (error) {
    console.log(err)
  }
}

mail();