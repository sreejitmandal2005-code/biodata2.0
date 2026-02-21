const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Gmail Transport Setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sreejitmandal2005@gmail.com",       // 🔥 YOUR GMAIL
        pass: "bhagyashri2005sreejit2007"     // 🔥 16 digit app password
    }
});

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: "sreejitmandal2005@gmail.com",  // 🔥 Where you want to receive messages
        subject: `New Message from ${name}`,
        text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send("Error sending message ❌");
        } else {
            console.log("Email sent: " + info.response);
            res.send("<h2>Message Sent Successfully 🚀</h2><a href='/'>Go Back</a>");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});