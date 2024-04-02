//const TelegramBot = require('node-telegram-bot-api');

//const  dotenv  =  require ( 'dotenv' ) ;
//require('dotenv').config();

import TelegramBot from "node-telegram-bot-api";

import { config } from "dotenv";

import { PrismaClient } from '@prisma/client';
import { create } from "domain";

config();

const prisma = new PrismaClient();

const token = process.env.Bot_Token;

console.log(token);

//const modelURL = 'https://teachablemachine.withgoogle.com/models/XOvF8qamS/';



const bot = new TelegramBot(process.env.Bot_Token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  
  const chatId = msg.chat.id;
  if(match){
    const resp = match[1];
    bot.sendMessage(chatId, resp);
  }else{
    bot.sendMessage(chatId, "Ocorreu um erro na comunicação");
  }
});



bot.on('message', async (msg) => {

  const chatId = msg.chat.id.toString();

  
  console.log(msg);
  bot.sendMessage(chatId, 'oieeee');

  const user = await prisma.user.upsert({
    where:{
      id_telegram: chatId,
    },
    update: {
      name: `${msg.chat.first_name} ${msg.chat.last_name}`
    },
    create: {
      name: `${msg.chat.first_name} ${msg.chat.last_name}`,
      id_telegram: msg.chat.id.toString(),
    },
  });

  let startDate = new Date();

  const session = await prisma.session.upsert({
    where:{
       
      
    },
    update: {
      
    },
    create: {
      created_at: startDate.setDate(startDate.getDate() + 1).toString(),
      update_at: startDate.setDate(startDate.getDate() + 1).toString(),
    },
  });

  // const menssage = await prisma.message.upsert({
  //   where:{
      
  //   },
  //   update: {
      
  //   },
  //   create: {
      
  //   },
  // });

  bot.sendMessage(
    msg.chat.id,
    `${user.name}, seu usuário já esta cadastrado no nosso sistema!`
  );

  //   bot.sendPhoto(chatId, 
  //     'https://yt3.googleusercontent.com/3h1oJUpRTMcQkLc87YHXj0-jxfF_mVqm4IrRUF3z3HmZHXaNoMOsUImJd6ifblrxYhPjCAjR15k=s900-c-k-c0x00ffffff-no-rj'
  //     ,{caption:" Hello Kitty Feliz"});

  // if(msg.photo){

  //     const urlPhoto = await bot.getFileLink(msg.photo[2].file_id);
  //     console.log(urlPhoto);
  //     //tem que baixar a imagem na pasta
  //     await bot.downloadFile(urlPhoto, './images');
  // }


});

// bot.on("photo", async (msg) => {

//   const chatId = msg.chat.id;
//   const photoId = msg.photo[msg.photo.length - 1].file_id;

//   const photoFile = await bot.downloadFile(photoId, "./src/imgs");
//   const photoInfo = await bot.getFile(photoId);
//   //const photoUrl = 'https://api.telegram.org/file/bot'${process.env.Bot_Token}/${photoInfo};

//   try {

//     const response = await fetch(modelURL, {
//       method: "POST",
//       body: {
//         imageURL: photoUrl
//       }
//     });

//     bot.sendMessage(response);

//   } catch (error) {
//     bot.sendMessage(chatId, 'Ocorreu um erro na clasificacao!!');
//   }

//   bot.sendMessage(chatId, 'Imagem salva com sucesso!');
//   // const photoUrl = await bot.getFileLink(lastPhoto);

//   bot.sendPhoto(chatId, photo, { caption: photoUrl });
//   // //bot.sendPhoto(chatId, photo,{caption:" Hello Kitty Feliz"});

//   // console.log(msg);


// });

// bot.on("document", async (msg) => {
//   const chatId = msg.chat.id;

//   const lastId = msg.document.file_id;

//   const document = await bot.downloadFile(lastId, "./src/imgs");

//   bot.sendDocument(chatId, document);

// })