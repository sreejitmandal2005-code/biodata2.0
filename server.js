const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

// Gmail Transport Setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sreejitmandal2005@gmail.com", // YOUR GMAIL
        pass: "iwrg wuuo elfa igbe" // Should be App Password
    }
});

app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: "sreejitmandal2005@gmail.com",
        subject: `New Contact Message from ${name}`,
        text: `
Name: ${name}
Email: ${email}

Message:
${message}
`
    };

    try {
        await transporter.sendMail(mailOptions);

        res.send(`
        <h2>Message Sent Successfully 🚀</h2>
        <a href="/">Go Back</a>
        `);
    } catch (error) {
        console.log(error);
        res.send("Error sending message ❌");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
