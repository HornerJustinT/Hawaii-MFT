const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const nodemailer = require("nodemailer");

router.post('/:username', async (req, res) => {  

  let key = Math.floor(Math.random() * 10000000000);
  console.log(key, req.params.username);
  const member = await pool.connect();
  try {
    await member.query('BEGIN')

    let queryText = `INSERT INTO "password_reset" ("key", "username") VALUES ($1, $2);`;
    await pool.query(queryText, [key, req.params.username])

    queryText = `SELECT email_table.email FROM email_table 
      JOIN members ON members.id = email_table.member_id
      JOIN "user" ON "user".id = members.id
      WHERE "user".username = $1 AND email_table.business = FALSE;`;
    let userEmail = await pool.query(queryText, [req.params.username])
      
    let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL_AUTH}`,
      pass: `${process.env.EMAIL_PASS}`,
    },
    });

    let message = `A password reset was requested by your account.
To reset your password please go to this link: localhost:3000/passwordreset/${key}
    
If you weren't the person who requested this please ignore this email.`

    // send mail with defined transport object
    await transporter.sendMail({
      from: '"HAIMFT" <HAIMFT@example.com>', // sender address
      to: userEmail.rows[0].email, // list of receivers
      subject: "HAIMFT Password Reset", // Subject line
      text: message, // plain text body
    });


      await member.query('COMMIT')
      res.sendStatus(201);
  }catch(error) {
    await member.query('ROLLBACK')
    console.log('Error in resetting password', error);
    res.sendStatus(500);
  } finally {
    member.release()
  }
});
  


module.exports = router;

