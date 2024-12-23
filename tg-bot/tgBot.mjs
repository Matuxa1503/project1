import TelegramApi from 'node-telegram-bot-api';
import getLastElement from './getLastElement.mjs';
import { startInterval } from './intervalManager.mjs';
import { checkUserAPI } from '../src/api/api.mjs';

// '7040303091:AAHK8jESpMxqrKnkyhGSrZVGGJWwL5IMSjE' devTgBot
const token = '7244567882:AAHgGVxxk8Z2eosdLBJP44ja73UCMLhCXIY';
const bot = new TelegramApi(token, { polling: true });

const btnOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: 'Получить информацию о последней застройке', callback_data: 'last-buildings' }]],
  }),
};

const start = () => {
  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    bot.setMyCommands([{ command: '/last', description: 'Информация о последней застройке' }]);

    if (text === '/start') {
      checkUserAPI(userId);
      startInterval(bot, chatId, userId);

      return bot.sendMessage(
        chatId,
        `Добро пожаловать. Для получения информации о последней застройке нажмите кнопку ниже или введите команду /last. При появлении новой застройки бот присылает её автоматически`,
        btnOptions
      );
    }

    if (text === '/last') {
      getLastElement(bot, chatId, userId);
    }
  });
};

bot.on('callback_query', async (msg) => {
  if (msg.data === 'last-buildings') {
    getLastElement(bot, msg.message.chat.id, msg.from.id);
  }
});

start();
