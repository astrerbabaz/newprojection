const TelegramBot = require('node-telegram-bot-api');
const deepai = require('deepai');

// Telegram botunuzun token'ını buraya ekleyin
const botToken = '6275052215:AAHEGyo1nJZpuifGvwsD0fA9UQlq_TYGSGc';

// API anahtarınızı buraya ekleyin
deepai.setApiKey('17a4080e-dd18-4264-bb1e-3ed9d96aa6b1');

const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/sor (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;    
  const userText = match[1];

    try {
        const resp = await deepai.callStandardApi("text-generator", {
            text: userText,
        });

        const generatedText = resp.output || 'API hatası';
        bot.sendMessage(chatId, generatedText);
    } catch (error) {
        console.error('API isteği başarısız oldu:', error);
        bot.sendMessage(chatId, 'API isteği başarısız oldu.');
    }
});



