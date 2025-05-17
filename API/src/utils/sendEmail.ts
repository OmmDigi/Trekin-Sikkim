import ejs from "ejs";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import path from "path";
import { transporter } from "../config/nodemailer";

const processEmailTemplate = (
  template_name: string,
  templateData: ejs.Data
): Promise<string> => {
  const templatePath = path.resolve(
    __dirname,
    "../../public/email_template/" + template_name
  );
  const existTemplateDate = {
    ...templateData,
    hostname: process.env.API_HOST_URL,
  };

  return new Promise((resolve: (value: string) => void, reject) => {
    ejs.renderFile(templatePath, existTemplateDate, (err, html) => {
      if (err) {
        reject("Error rendering EJS template:" + err);
      }
      resolve(html);
    });
  });
};

export const sendEmail = async (
  to: string[] | string,
  type: "verify-email" | "reset-password-email" | "booking-confirmation",
  templateData?: ejs.Data
) => {
  let mailOptions = {};
  const sendForm = process.env.SMTP_USER;

  if (type === "verify-email") {
    const html = await processEmailTemplate("verify-email.html", templateData || {});
    mailOptions = {
      from: `"Email Verification Link Form Trek In Sikkim" <${sendForm}>`, // Sender address
      to, // List of recipients
      subject: "Verify your email address", // Subject line
      html,
    };
  } else if (type === "reset-password-email") {
    const html = await processEmailTemplate("reset-password.html", templateData || {});
    mailOptions = {
      from: `"Reset Password Email" <${sendForm}>`, // Sender address
      to, // List of recipients
      subject: "Reset Password Email", // Subject line
      html,
    };
  } else {
    const html = await processEmailTemplate("booking-confirmation.html", templateData || {});
    mailOptions = {
      from: `"Booking Confirmation Email" <${sendForm}>`, // Sender address
      to, // List of recipients
      subject: "Booking Confirmation Email From Trek In Sikkim", // Subject line
      html,
    };
  }

  return new Promise(
    (resolve: (value: SMTPTransport.SentMessageInfo) => void, reject) => {
      transporter().sendMail(mailOptions, (error, info) => {
        if (error) {
          reject("Error sending email:" + error);
        }
        resolve(info);
      });
    }
  );
};
