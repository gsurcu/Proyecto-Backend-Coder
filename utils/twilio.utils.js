const twilio = require('twilio')
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = twilio(accountSid, authToken)

const SMS = async () =>{ 
  try {
    const message = await client.messages.create({
      body: 'Hola soy un SMS desde Node.js!',
      from: '+19206858561',
      to: process.env.ADMIN_SMS
    })
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}


const options = {
  body: 'Hola soy un WSP desde Node.js!',
  from: 'whatsapp:+14155238886',
  to: process.env.ADMIN_WSP,
}
const WSP = async () =>{ 
  try {
    const message = await client.messages.create(options)
    console.log(message)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  SMS,
  WSP,
}