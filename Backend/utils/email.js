const nodemailer = require('nodemailer');


exports.sendMail = async (options) => {
    // 1- create the transpotor
    const transpoter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    // 2- define the mail options
    const mailOptions = {
        from: 'Lewaa shaaban <junior@university.com>',
        to: options.email,
        subject: options.subject,
        text: options.msg
    };

    // 3-send the mail
    await transpoter.sendMail(mailOptions);
}