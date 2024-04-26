import TelegramBot from "node-telegram-bot-api";

namespace TGBotUtils {
  const bot = new TelegramBot(process.env.BOT_TOKEN!, { polling: true });

  const commandsRecheck = (command: string) => {
    if (command?.startsWith("/test")) {
      return "/test";
    } else {
      return "notfound";
    }
  };

  export const runTg = () => {
    const commands = [
      {
        command: "/command",
        description: "description",
      },
    ];

    bot
      .setMyCommands(commands)
      .then(() => {
        console.log("Custom commands set successfully!");
      })
      .catch((error) => {
        console.error("Error setting custom commands:", error.message);
      });

    bot.on("message", async (msg) => {
      const chatId: number = msg?.chat?.id;
      const forumTopic = msg?.message_thread_id;

      console.log("chatId", msg);

      const messageText = msg?.text;

      if (messageText?.startsWith("/")) {
        let command: string = messageText.split(" ")[0];
        command = commandsRecheck(command);

        // Handle commands as usual
        switch (command) {
          case "/test":
            break;
          default:
            console.log("messageText.startsWith");
            break;
        }
      }
    });
  };
}

export default TGBotUtils;
