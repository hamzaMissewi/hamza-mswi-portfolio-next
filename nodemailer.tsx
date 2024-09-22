import nodemailer, { TransportOptions } from "nodemailer";
import Mail, { Address } from "nodemailer/lib/mailer";
import { MailFieldsType } from "@/components/ContactMe";

console.log("process.env.MAIL_USER", process.env.MAIL_USER);
console.log("process.env.MAIL_PASSWORD", process.env.MAIL_PASSWORD);
console.log(" process.env.MAIL_HOST", process.env.MAIL_HOST);
console.log(" process.env.MAIL_PORT", process.env.MAIL_PORT);
export const transporter = nodemailer.createTransport({
  // host: process.env.MAIL_HOST,
  //  || "sandbox.smtp.mailtrap.io",
  // host: "smtp-mail.outlook.com",
  host: "smtp.gmail.com",
  port: 465, //process.env.MAIL_PORT, Gmail SMTP Port: 465 (SSL required) or 587 (TLS required)
  auth: {
    user: "be5075ea4078ea",
    // user: process.env.MAIL_USER,
    pass: "2786ad0c8691ea",
    // pass: process.env.MAIL_PASSWORD,
  },
  // secure: process.env.NODE_ENV !== "development",
  service: "gmail",
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
} as TransportOptions);

const CONTACT_MESSAGE_FIELDS: MailFieldsType = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
};

function isKeyOfEmailFields(key: string): key is keyof MailFieldsType {
  return key in CONTACT_MESSAGE_FIELDS;
}

// to: string | Address | Array<string | Address>,
export const mailOptions = (data: MailFieldsType): Mail.Options => {
  const textData = Object.entries(data).reduce((str, [key, val]) => {
    if (isKeyOfEmailFields(key)) {
      str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`;
    }
    return str;
  }, "");

  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    if (isKeyOfEmailFields(key)) {
      str += `<h3 className="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p className="form-answer" style={{align:"left"}}>${val}</p>`;
    }
    return str;
  }, "");

  return {
    from: data.email,
    subject: data.subject ?? "New Contact Form Submission",
    date: new Date(),
    to: ["hamzashadow47@gmail.com"],
    // to: ["hamzashadow47@gmail.com", "hamza.missaoui47@gmail.com"],
    // text: textData,
    // name: "hamza missaoui",
    html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <title>Contact Form Submission</title>
                    <meta charset="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta content="width=device-width, initial-scale=1" name="viewport"/>
                    <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
                <style type="text/css">
                    body,
                    table,
                    td,
                    a {
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }
       
/*        <!--                            body {-->*/
/*<!--                                font-family: Arial, sans-serif;-->*/
/*<!--                                background-color: #f4f4f4;-->*/
/*<!--                                margin: 0;-->*/
/*<!--                                padding: 20px;-->*/
/*<!--                            }-->*/
/*<!--                            .container {-->*/
/*<!--                                max-width: 600px;-->*/
/*<!--                                margin: auto;-->*/
/*<!--                                background: white;-->*/
/*<!--                                padding: 20px;-->*/
/*<!--                                border-radius: 5px;-->*/
/*<!--                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);-->*/
/*<!--                            }-->*/
/*<!--                            h1 {-->*/
/*<!--                                color: #333;-->*/
/*<!--                            }-->*/
/*<!--                            p {-->*/
/*<!--                                color: #555;-->*/
/*<!--                            }-->*/
/*<!--                            .footer {-->*/
/*<!--                                margin-top: 20px;-->*/
/*<!--                                font-size: 0.8em;-->*/
/*<!--                                color: #777;-->*/
/*<!--                            }-->*/
            table {
                border-collapse: collapse !important;
            }

        body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }

        @media screen and (max-width: 525px) {
            .wrapper {
                width: 100% !important;
                max-width: 100% !important;
            }

            .responsive-table {
                width: 100% !important;
            }

            .padding {
                padding: 10px 5% 15px 5% !important;
            }

            .section-padding {
                padding: 0 15px 50px 15px !important;
            }
        }

        .form-container {
            margin-bottom: 24px;
            padding: 20px;
            border: 1px dashed #ccc;
        }

        .form-heading {
            color: #2a2a2a;
            font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
            font-weight: 400;
            text-align: left;
            line-height: 20px;
            font-size: 18px;
            margin: 0 0 8px;
            padding: 0;
        }

        .form-answer {
            color: #2a2a2a;
            font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
            font-weight: 300;
            text-align: left;
            line-height: 20px;
            font-size: 16px;
            margin: 0 0 24px;
            padding: 0;
        }

        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }
    </style>
</head>
<body style="margin: 0 !important; padding: 0 !important; background: #fff">
<div
        style="
        display: none;
        font-size: 1px;
        color: #fefefe;
        line-height: 1px;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
      "
></div>
                                                <div class="form-container">${htmlData}</div>

  <body style="margin: 0 !important; padding: 0 !important; background: #fff">
                   <div>
                      <h1>Welcome, {{name}}!</h1>
                      <p>Thank you for joining us. We're glad to have you!</p>
                   </div>        
                 
                         <div class="container">
                    <h1>New Contact Form Submission</h1>
<!--                            <p><strong>Name:</strong> {{name}}</p>-->
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Subject:</strong></p>
                    <p>${data.subject}</p>
                    <p><strong>Message:</strong></p>
                    <p>${data.message}</p>
                     <div class="footer">
                                <p>This email was sent from your portfolio contact form.</p>
                            </div>
                </div>
                            <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
<!--                    <table border="0" cellpadding="0" cellspacing="0" width="100%">-->
<!--                        <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" >-->
<!--                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>New Contact Message</h2> <div class="form-container">-->
<!--                      -->
<!--</div></td></tr></table> </td></tr></table> </td></tr>-->
<!--                        </table>-->
<!--                        </td></tr>-->
<!--                    </table>-->
<!--                    <h1>Welcome, {{name}}!</h1>-->
                    <h1>Welcome, ${data.name}</h1>
                    <p>Thank you for joining us. We're glad to have you!</p>
            </div>       
            
<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td
                align="center"
                bgcolor="#ffffff"
                class="section-padding"
                style="padding: 10px 15px 30px 15px"
        >
            <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="responsive-table"
                    style="max-width: 500px"
                    width="100%"
            >
                <tr>
                    <td>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td>
                                    <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                    >
                                        <tr>
                                            <td
                                                    class="padding message-content"
                                                    style="
                                                          padding: 0 0 0 0;
                                                          font-size: 16px;
                                                          line-height: 25px;
                                                          color: #232323;
                                                        "
                                            >
                                                <h2>New Contact Message</h2>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table> 
<!--test-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" >
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>New Contact Message</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr>
                        </table>
                        </td></tr>
                    </table>
    </body>
    </html>`,
  };
};
