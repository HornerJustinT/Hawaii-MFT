const express = require("express");
const pool = require("../modules/pool");
const nodemailer = require("nodemailer");
const router = express.Router();

async function main(recipients) {
    if (recipients) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: `${process.env.EMAIL_AUTH}`,
            pass: `${process.env.EMAIL_PASS}`,
        },
        });

        const mailTo = []
        for (person of recipients) {
            mailTo.push(person)
        }

        // send mail with defined transport object
        let info = await transporter.sendMail({
        from: '"HAIMFT" <HAIMFT@example.com>', // sender address
        to: mailTo, // list of receivers
        subject: "testing", // Subject line
        text: "Hello world?", // plain text body
        });
    }
}

main().catch(console.error);


/**
 * POST route template
 */
router.post("/modal", (req, res) => {
    main(req.body.recipients);
    res.sendStatus(200)
});

module.exports = router;