const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {
  try {
    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // STARTTLS
      secure: false, // must be false for STARTTLS
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // 16-character App Password
      },
      connectionTimeout: 20000, // 20 seconds timeout
    });

    // Mail options
    const mailOptions = {
      from: `"Dream Journal" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully:", info.messageId);
    return info; // optionally return info if caller needs it
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    // Throw error to allow caller to handle it if needed
    throw new Error(`Email could not be sent: ${error.message}`);
  }
};
