const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log("New Message:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    res.send("<h2>Message Sent Successfully 🚀</h2><a href='/'>Go Back</a>");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
