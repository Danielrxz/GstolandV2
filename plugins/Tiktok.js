const axios = require('axios');

module.exports = {
  name: '.tt',
  description: 'Descarga videos de TikTok sin marca de agua.',
  async execute(m, { args, sock }) {
    const url = args[0];
    if (!url || !url.includes('tiktok.com')) {
      return m.reply('📥 *Ejemplo:* .tt https:                                         
    }
    m.reply('//www.tiktok.com/@usuario/video/123456');
    }
    m.reply('😼 Descargando video de TikTok...');

    try {
      const { data } = await axios.get(`https:                                             
      if (!data || !data.video || !data.video.no_watermark) return m.reply('//api.tiklydown.me/api/download?url=${url}`);
      if (!data || !data.video || !data.video.no_watermark) return m.reply('❌ No se pudo obtener el video sin marca de agua.');
      
      await sock.sendMessage(m.chat, { 
        video: { 
          url: data.video.no_watermark 
        }, 
        caption: `✅ *Video descargado Gatoland🚀 con éxito*\n🎵 Autor: ${data.author.unique_id}\n🎬 Título: ${data.title || 'Sin título'}` 
      }, { quoted: m });
    } catch (err) {
      console.error(err);
      m.reply('❌ Ocurrió un error al descargar el video.');
    }
  }
};


handler.command = ["tt"];
module.exports = handler;