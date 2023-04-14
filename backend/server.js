require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const PORT = process.env.PORT || 5000;


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello this is  Sahil"s  Portfolio!'
    })
})

app.post('/sendemail', async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD,
            },
        });

        const { name, message, email, subject } = req.body;
        const content =
            `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2>
                    <p style="font-size:0.9em;">${name} <br /> ${email} <br /> from Sahil Portfolio </p>
                    <p>${message}</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                          <p>Sahil.com Inc</p>
                          <p>1600 North-East-South-West</p>
                          <p>India</p>
                    </div>
              </div>`;

        await transporter.sendMail({
            from: process.env.USER,
            to: 'sahil.kumar260802@gmail.com',
            subject: `${subject}`,
            html: content,
        });
        console.log("email sent successfully");
        return res.status(200);
    } catch (error) {
        console.log("email not sent!");
        console.log(error);
        return error;
    }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))