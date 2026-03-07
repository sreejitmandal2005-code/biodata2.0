const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;
const GMAIL_USER = process.env.GMAIL_USER || "";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || "";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const transporter = nodemailer.createTransport({
    service: "gmail",
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD
    }
});

app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("Please fill all fields.");
    }

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
        return res.status(500).send("Mail service is not configured on server.");
    }

    const mailOptions = {
        from: GMAIL_USER,
        replyTo: email,
        to: GMAIL_USER,
        subject: `New Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        res.send("<h2>Message sent successfully.</h2><a href='/'>Go Back</a>");
    } catch (error) {
        console.error("Mail send failed:", error.message);
        res.status(500).send("Error sending message. Check Gmail app password/config.");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

    if (GMAIL_USER && GMAIL_APP_PASSWORD) {
        transporter.verify((error) => {
            if (error) {
                console.error("Gmail transport verification failed:", error.message);
            } else {
                console.log("Gmail transport is ready.");
            }
        });
    } else {
        console.warn("Gmail transport disabled: set GMAIL_USER and GMAIL_APP_PASSWORD.");
    }
});
