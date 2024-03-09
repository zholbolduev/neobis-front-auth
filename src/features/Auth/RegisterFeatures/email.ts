import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "eldos.zholbolduev@gmail.com",
    pass: "Dosi.xxx",
  },
});

const sendConfirmationEmail = (email: string, username: string): void => {
  const mailOptions: nodemailer.SendMailOptions = {
    from: "eldos.zholbolduev@gmail.com",
    to: email,
    subject: "Подтверждение регистрации",
    html: `
      <p>Здравствуйте, ${username}!</p>
      <p>Спасибо за регистрацию на нашем сайте.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Ошибка при отправке письма:", error);
    } else {
      console.log("Письмо успешно отправлено:", info.response);
    }
  });
};

export { sendConfirmationEmail };
