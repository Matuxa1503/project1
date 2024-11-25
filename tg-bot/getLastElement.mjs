import axios from 'axios';
import btnOptions from './btnOptions.mjs';

const getLastElement = async (bot, chat, userId) => {
  try {
    const chatId = chat;
    const response = await axios.get('http://localhost:5000/last', { params: { userId } });
    // если response.data.message пустой записать в el = null, в противном случае записать элемент
    const el = response.data.message ? response.data.message.items[0].data : null;

    if (el) {
      return bot.sendMessage(
        chatId,
        `Последняя застройка: \n${el.title}.\n${el.dateBuild} \nДля подробной информации кликнете по кнопке ниже:`,
        btnOptions(el.link, userId)
      );
    } else {
      return bot.sendMessage(chatId, `Ошибка при выполнении команды. Попробуйте позже`);
    }
  } catch (err) {
    console.error('Error tgBot getLastElem:', err.message);
  }
};

export default getLastElement;
