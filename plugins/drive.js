const fetch = require('node-fetch');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');
const { exec } = require('child_process');

module.exports = {
  name: 'drive',
  alias: ['drv'],
  category: 'descargas',
  desc: 'Descarga archivos públicos de Google Drive',
  use: '.drive <enlace>',
  async run({ conn, m, args }) {
    const url = args[0];
    if (!url || !url.includes('drive.google.com')) {
      return m.reply('❌ Enlace inválido. Usa:\n.drive https:                         
    }

    try {
      const match = url.match(/[-\w]{25,}/);
      const fileId = match ? match[0] : null;
      if (!fileId) return m.reply('//drive.google.com/...');
    }

    try {
      const match = url.match(/[-\w]{25,}/);
      const fileId = match ? match[0] : null;
      if (!fileId) return m.reply('❌ No se pudo extraer el ID del archivo.');

      const directLink = `https:                                                    
      const res = await fetch(directLink);
      if (!res.ok) return m.reply('//drive.google.com/uc?export=download&id=${fileId}`;
      const res = await fetch(directLink);
      if (!res.ok) return m.reply('❌ No se pudo descargar el archivo.');

      const buffer = await res.buffer();
      const contentType = res.headers.get('content-type');
      const fileName = res.headers.get('content-disposition').match(/filename="(.+)"/)[1];

      await conn.sendMessage(m.chat, { document: buffer, fileName, mimetype: contentType }, { quoted: m });
    } catch (error) {
      console.error(error);
      m.reply('❌ Error al descargar el archivo.');
    }
  },
};