const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

// Parse JSON request body
app.use(bodyParser.json());

// Email endpoint
app.post('/send-email', async (req, res) => {
  const { name, email, phone } = req.body;


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const mailOptions = {
  from: email, // your actual Gmail address
  replyTo: email, // user input – where reply will go
  to: 'pradnyarkasar@gmail.com',
  subject: 'New Form Submission',
  text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`,
};

try {
  let info = await transporter.sendMail(mailOptions);
  console.log('Email sent: ', info.response);  // <-- Add this line
  res.send('Email sent successfully!');
} catch (error) {
  console.error('Error sending email:', error);
  res.status(500).send('Error sending email');
}

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
