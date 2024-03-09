import axios from "axios";

const SENDGRID_API_KEY = "your_sendgrid_api_key";

const sendConfirmationEmail = (email: string, username: string): void => {
  axios
    .post(
      "https://api.sendgrid.com/v3/mail/send",
      {
        personalizations: [
          {
            to: [
              {
                email: email,
              },
            ],
            subject: "Подтверждение регистрации",
          },
        ],
        from: {
          email: "eldos.zholbolduev@gmail.com",
        },
        content: [
          {
            type: "text/html",
            value: `
          <p>Здравствуйте, ${username}!</p>
          <p>Спасибо за регистрацию на нашем сайте.</p>
        `,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log("Письмо успешно отправлено:", response.data);
    })
    .catch((error) => {
      console.error("Ошибка при отправке письма:", error);
    });
};

export { sendConfirmationEmail };
