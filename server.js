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

function toggleMenu(){
    document.getElementById("navLinks").classList.toggle("active");
}


// CERTIFICATE FULL SCREEN
function openCert(img){
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("modalImg");

modal.style.display = "block";
modalImg.src = img.src;
}

document.querySelector(".close-modal").onclick = function(){
document.getElementById("certModal").style.display="none";
}

// CLOSE WHEN CLICK OUTSIDE
window.onclick = function(event){
const modal = document.getElementById("certModal");
if(event.target == modal){
modal.style.display="none";
}
}

