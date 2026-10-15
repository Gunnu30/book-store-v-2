const nodemailer = require('nodemailer')

async function sendResetMail(toEmail,token) {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            type:'LOGIN',
            user: process.env.EMAIL_USER ,
            pass: process.env.EMAIL_PASS,
        }
    });
    console.log(transporter)
    const resetLink = `${process.env.URL}/admin/forgot-password?token=${token}`;

    await transporter.sendMail({

        from: `admin portal <no-reply@${process.env.URL}>`,
        to:toEmail,
         subject: 'Admin Password Reset',
        html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
        `
    })
    
    console.log(transporter)
}

module.exports = sendResetMail