const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "username",
      pass: "password",
    },
    
  });
  
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });

  router.post("/send", (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const message = req.body.message; 
    const mail = {
      from: name,
      to: "admin@scizers.com",
      subject: "Contact Form Submission",
      html: `<p>Name: ${name}</p>
             <p>Phone: ${phone}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent" });
      }
    });
  });





app.listen(5000, () => console.log("Server Running"));