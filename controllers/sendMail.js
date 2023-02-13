"use strict";
require("dotenv").config();
const nodemailer = require("nodemailer");
/**
 * sendEmail
 * @param{Object}mailObj - Email information
 * @param{String}from- Email address of the sender
 * @param{Array}to- Array of recipients email address
 * @param{String}subject - Subject of the email
 * @param{String}text - Email body
 */
const sendEmail = async (mailObj) => {
    const { from, to, subject, text } = mailObj;
    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                ciphers: "SSLv3",
            },
        });

        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: from, // sender address
            to: to, // list of receivers
            subject: subject, // subject line
            text: text, // plain text body
        });
        console.log(`Message sent: ${info.messageId}`);
        return `Message sent: ${info.messageId}`;
    } catch (error) {
        console.error(error);
        thrownewError(`Something went wrong in the sendmail method. Error: ${error.message}`);
    }
};
module.exports = sendEmail;
