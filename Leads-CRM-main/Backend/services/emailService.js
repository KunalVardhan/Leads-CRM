const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendLeadEmail = async (lead) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // ya admin email
      subject: "New Lead Created",

      html: `
        <h2>New Lead Received</h2>
        <p><b>Name:</b> ${lead.name}</p>
        <p><b>Email:</b> ${lead.email}</p>
        <p><b>Phone:</b> ${lead.phone}</p>
        <p><b>Company:</b> ${lead.company}</p>
        <p><b>Status:</b> ${lead.status}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email error:", error);
  }
};

module.exports = sendLeadEmail;