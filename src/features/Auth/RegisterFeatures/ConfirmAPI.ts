const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// Генерация токена подтверждения (здесь можно использовать любую библиотеку для генерации токенов)
function generateConfirmationToken() {
  // Генерация уникального токена
}

// Создание транспорта для отправки почты
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "your_email@gmail.com",
    pass: "your_password",
  },
});

// Маршрут для отправки письма с подтверждением
router.post("/sendConfirmationEmail", async (req, res) => {
  const { email } = req.body;
  const confirmationToken = generateConfirmationToken();
  const mailOptions = {
    from: "your_email@gmail.com",
    to: email,
    subject: "Подтверждение регистрации",
    html: `<p>Для завершения регистрации перейдите по <a href="http://yourwebsite.com/confirm/${confirmationToken}">ссылке</a>.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

// Маршрут для обработки запроса подтверждения
router.get("/confirm/:token", (req, res) => {
  const { token } = req.params;

  // Проверка токена в базе данных и подтверждение регистрации пользователя
});

module.exports = router;
