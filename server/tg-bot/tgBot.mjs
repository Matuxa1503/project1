import TelegramApi from 'node-telegram-bot-api';
import getLastElement from './lastEl.mjs';
import { checkUserAPI } from './api/api.mjs';
import botWebhook from './botWebhook.mjs';
import checkNewElement from './checkNewElements/checkNewEl.mjs';
import btnOptions from './btnOptions.mjs';
import { config } from 'dotenv';
config();

const token = process.env.TG_TOKEN;
const bot = new TelegramApi(token, { polling: false });

export const start = async () => {
  await botWebhook(token); // connect tg bot and vercel
};

export const handleCommandTg = async (text, chatId, userId) => {
  bot.setMyCommands([{ command: '/last', description: 'Информация о последней застройке' }]);

  if (text === '/start') {
    await checkUserAPI(userId, chatId);

    return bot.sendMessage(
      chatId,
      `Добро пожаловать. Для получения информации о последней застройке нажмите кнопку ниже или введите команду /last. При появлении новой застройки бот присылает её автоматически`,
      btnOptions('Последняя застройка', 'startType')
    );
  }

  if (text === '/last') {
    await getLastElement(bot, chatId, userId);
  }
};

export const handleCronJob = async () => {
  await checkNewElement(bot);
};
