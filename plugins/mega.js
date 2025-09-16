const { default: axios } = require('axios');
const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const { download } = require('megajs');

module.exports = {
  name: '.mega',
  description: 'Descarga archivos desde MEGA',
  async execute(m, { args, sock }) {
    if (!args[0]) return m.reply('📥 Ingresa un enlace de MEGA válido.');
    let url = args[0];
    if (!url.includes('mega.nz')) return m.reply('❌ Ese no parece un enlace de MEGA.');
    m.reply('🔄 Descargando archivo de MEGA... espera un momento.');

    try {
      const file = download(url);
      file.name.then(async name => {
        const stream = file;
        const chunks = [];
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('end', async () => {
          const buffer = Buffer.concat(chunks);
          if (buffer.length > 1024 * 1024 * 100) {
            return m.reply('❌ El archivo supera el límite de 100MB.');
          }
          await sock.sendMessage(m.chat, { 
            document: buffer, 
            fileName: name, 
            mimetype: 'application/octet-stream' 
          }, { quoted: m });
        });
      });
    } catch (e) {
      console.error(e);
      m.reply('❌ Hubo un error al descargar el archivo.');
    }
  }
};