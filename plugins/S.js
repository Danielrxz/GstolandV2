const { sticker } = require('../lib/sticker');

let handler = async (m, { conn }) => {
  if (!m.quoted) return m.reply('📌 Responde a una imagen o video corto para convertirlo en sticker.');
  let mime = m.quoted.mimetype || '';
  if (!/image|video/.test(mime)) return m.reply('⚠️ El archivo debe ser una imagen o video corto.');
  let media = await m.quoted.download();
  let stickerData = await sticker(media, false, {
    pack: 'Gatoland🚀⚔️',
    author: 'Danielrxz'
  });
  await conn.sendMessage(m.chat, { sticker: stickerData }, { quoted: m });
};

handler.command = /^s$/i;
handler.help = ['s'];
handler.tags = ['sticker'];

module.exports = handler;