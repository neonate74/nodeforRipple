var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: 'kbhan74@gmail.com',
      pass: 'aptaxzxlppwqbdnw'
  }
});

var mailOptions = {
  from: 'kbhan74@gmail.com',
  to: 'neonate74@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
