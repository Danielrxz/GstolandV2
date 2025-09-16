const handler = async (m, { conn, text, participants }) => {
  const gif = 'https://media.tenor.com/VzLeAfuDjIYAAAAC/anime-kill.gif'; // Puedes cambiar el GIF

  if (!text && !m.mentionedJid[0]) {
    return m.reply('Etiqueta a alguien para matar 😼');
  }

  const target = m.mentionedJid[0] ? '@' + m.mentionedJid[0].split('@')[0] : text;

  await conn.sendMessage(m.chat, {
    video: { url: gif },
    caption: `⚔️ @m.sender.split('@')[0] mató a{target} 😵`,
    gifPlayback: true,
    mentions: [m.sender, ...(m.mentionedJid || [])]
  }, { quoted: m });
};

handler.command = ['kill'];
handler.group = true;
handler.help = ['kill @user'];
handler.tags = ['fun'];

export default handler;