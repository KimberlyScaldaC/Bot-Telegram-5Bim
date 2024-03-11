const TelegramBot = require('node-telegram-bot-api');

const token = '7086159315:AAE0EmI36anlAoQs7b88Cpm2ZneftZsAZCg';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1]; 

  bot.sendMessage(chatId, resp);

});

bot.on("photo", async (msg) => {

  const chatId = msg.chat.id;
  const lastPhoto = msg.photo[msg.photo.length - 1].file_id;

  const photo = await bot.downloadFile(lastPhoto, "./src/imgs");
  const photoUrl = await bot.getFileLink(lastPhoto);

  bot.sendPhoto(chatId, photo,{caption: photoUrl});
  //bot.sendPhoto(chatId, photo,{caption:" Hello Kitty Feliz"});

  console.log(msg);

});

bot.on("document", async (msg) => {
  const chatId = msg.chat.id;

  const lastId = msg.document.file_id;

  const document = await bot.downloadFile(lastId, "./src/imgs");

  bot.sendDocument(chatId, document);

})

bot.on('message', async (msg) => {

    const chatId = msg.chat.id;

    // if(msg.photo){
        
    //     const urlPhoto = await bot.getFileLink(msg.photo[2].file_id);
    //     console.log(urlPhoto);
    //     //tem que baixar a imagem na pasta
    //     await bot.downloadFile(urlPhoto, './images');
    // }

    console.log(msg);
    bot.sendMessage(chatId, 'oieeee');

//   bot.sendPhoto(chatId, 
//     'https://yt3.googleusercontent.com/3h1oJUpRTMcQkLc87YHXj0-jxfF_mVqm4IrRUF3z3HmZHXaNoMOsUImJd6ifblrxYhPjCAjR15k=s900-c-k-c0x00ffffff-no-rj'
//     ,{caption:" Hello Kitty Feliz"});

});