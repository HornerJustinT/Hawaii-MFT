const express = require("express");
const pool = require("../modules/pool");
const nodemailer = require("nodemailer");
const router = express.Router();


/**
 * POST route template
 */
router.post("/modal", async (req, res) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: `${process.env.EMAIL_AUTH}`,
        pass: `${process.env.EMAIL_PASS}`,
    },
    });

    // send mail with defined transport object
    await transporter
        .sendMail({
            from: '"HAIMFT" <HAIMFT@example.com>', // sender address
            to: req.body.recipients, // list of receivers
            subject: req.body.header, // Subject line
            text: req.body.message, // plain text body
        })
        .then(res.sendStatus(200))
        .catch(res.sendStatus(500))
});

module.exports = router;