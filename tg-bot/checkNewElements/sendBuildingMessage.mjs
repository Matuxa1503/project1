import btnOptions from '../btnOptions.mjs';
import handle403Error from '../handle403Error.mjs';

const sendBuildingMessage = async (bot, chatId, userId, item) => {
  return bot
    .sendMessage(
      chatId,
      `Появилась новая застройка: \n${item.data.title}.\n${item.data.dateBuild} \nДля подробной информации кликнете по кнопке ниже:`,
      btnOptions(item.data.link, userId)
    )
    .catch((err) => {
      console.error('Error in sendBuildingMessage:', err.message);
      handle403Error(err, userId);
    });
};

export default sendBuildingMessage;
