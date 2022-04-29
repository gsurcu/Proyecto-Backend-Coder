const twilio = require('twilio')
const accountSid = process.env.ACCOUNT_SID || 'ACea198a421ebfe4aade1fdca240a2f849'
const authToken = process.env.AUTH_TOKEN || 'c1f7f58f56ae0d0988ea916ba73a5612'
const client = twilio(accountSid, authToken)

// const SMS = async () =>{ 
//   try {
//     const message = await client.messages.create({
//       body: 'Hola soy un SMS desde Node.js!',
//       from: '+19206858561',
//       to: '+541122533135'
//     })
//     console.log(message)
//   } catch (error) {
//     console.log(error)
//   }
// }

// SMS()

const options = {
  body: 'Hola soy un WSP desde Node.js!',
  from: 'whatsapp:+14155238886',
  to: 'whatsapp:+5491122533135',
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

}