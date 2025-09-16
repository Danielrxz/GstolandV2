const ytSearch = require('yt-search');
const playdl = require('play-dl');

module.exports = {
  name: 'play',
  alias: ['play'],
  description: 'Descarga audio de YouTube por nombre o link',
  category: 'descargas',
  async run(m, { text, conn, prefix, command }) {
    if (!text) return m.reply(`✍️ Escribe el nombre de la canción o link de YouTube`);

    let search = await ytSearch(text);
    let video = search.videos[0];

    if (!video) return m.reply('❌ No se encontró ningún resultado.');

    let stream = await playdl.stream(video.url);
    let title = video.title;
    let duration = video.timestamp;
    let views = video.views;
    let url = video.url;

    await conn.sendMessage(m.chat, {
      audio: stream.stream,
      mimetype: 'audio/mp4',
      fileName: `${title}.mp3`,
      ptt: false,
      caption: `🎶 *Título:* ${title}\n⏱️ *Duración:* ${duration}\n👀 *Vistas:* ${views.toLocaleString()}\n🔗 *Link:* ${url}`
    }, { quoted: m });
  }
};

const commands = {
  play: module.exports
};

const handler = async (m, { conn }) => {
  const prefix = '.';
  const command = m.text.toLowerCase().startsWith(prefix) ? m.text.slice(prefix.length).split(' ')[0] : '';

  if (commands[command]) {
    commands[command].run(m, { text: m.text.replace(`.${command} `, ''), conn, prefix, command });
  }
};

module.exports.handler = handler;