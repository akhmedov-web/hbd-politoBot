const TelegramBot = require("node-telegram-bot-api");

const token = "7616031779:AAHVBltvv_tvzTQjWbU4KpoAQ3RuBoubYWg";

const bot = new TelegramBot(token, { polling: true });

const main = () => {
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        `Assalomu alaykum <b>${msg.from.first_name}!</b> 
            \nDo you want to congratulate your friend on their birthday?
            \nThen click <b>"Congratulate 🎉"</b> button below!`,
        {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Congratulate 🎉",
                  web_app: {
                    url: "https://hbd-polito.vercel.app/new",
                  },
                },
                {
                  text: "About ℹ️",
                  callback_data: "aboutOpt",
                },
              ],
            ],
          },
        }
      );
    }
  });

  // Handle callback
  bot.on("callback_query", (query) => {
    console.log(query);
    const chatId = query.message.chat.id;
    if (query.data === "aboutOpt") {
      bot.sendMessage(
        chatId,
        `<b>Welcome to HBD Polito Bot!🎓</b>
        \nWe’ve designed this mini-app to make celebrations more special. Use the bot to submit a form and see your congratulatory messages on the university’s TV monitors. 
        \nThank you for spreading positivity around campus! ✨
        \nDeveloped with care.`,
        { parse_mode: "HTML" }
      );
    }
  });
};

bot.on("polling_error", (error) => {
  console.error("Polling error:", error);
});

main();
