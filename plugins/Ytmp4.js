const ytSearch = require('yt-search');
const playdl = require('play-dl');

module.exports = {
  name: 'ytmp4',
  alias: ['video', 'ytvideo', 'mp4'],
  description: 'Descargar videos de YouTube en MP4',
  category: 'descargas',
  async run(m, { text, conn, prefix, command }) {
    if (!text) return m.reply(`✍️ Escribe el nombre del video o pega el enlace de YouTube`);

    let search = await ytSearch(text);
    let video = search.videos[0];

    if (!video) return m.reply('❌ No se encontró ningún video.');

    let info = await playdl.video_info(video.url);
    let stream = await playdl.stream_from_info(info);

    let sizeMB = Number(stream.stream.readableLength / 1024 / 1024).toFixed(2);

    if (sizeMB > 850) {
      return m.reply(`⚠️ El video pesa *${sizeMB} MB* y excede el límite de 850 MB.`);
    }

    await conn.sendMessage(m.chat, {
      video: stream.stream,
      mimetype: 'video/mp4',
      fileName: `${video.title}.mp4`,
      caption: `🎬 *Título:* ${video.title}\n📦 *Tamaño:* ${sizeMB} MB\n⏱️ *Duración:* ${video.timestamp}\n👁️ *Vistas:* ${video.views.toLocaleString()}\n🔗 *Link:* ${video.url}`
    }, { quoted: m });
  }
};

const commands = {
  ytmp4: module.exports,
  // Agrega más comandos aquí...
};

const handler = async (m, { conn }) => {
  const prefix = '.';
  const command = m.text.toLowerCase().startsWith(prefix) ? m.text.slice(prefix.length).split(' ')[0] : '';

  if (commands[command]) {
    commands[command].run(m, { text: m.text.replace(`${prefix}${command} `, ''), conn, prefix, command });
  } else {
    const aliasCommands = Object.values(commands).find((cmd) => cmd.alias && cmd.alias.includes(command));
    if (aliasCommands) {
      aliasCommands.run(m, { text: m.text.replace(`${prefix}${command} `, ''), conn, prefix, command });
    }
  }
};

module.exports.handler = handler;