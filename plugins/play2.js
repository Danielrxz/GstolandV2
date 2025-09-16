import yts from 'yt-search'
import ytdl from 'ytdl-core'
import fs from 'fs'

const handler = async (m, { conn, args, text }) => {
  if (!text) return m.reply('🎵 Ingresa el nombre de la canción.\nEj: .play2 Un x100to')
  m.reply('🔍 Buscando la canción...')

  try {
    const res = await yts(text)
    const video = res.videos[0]
    if (!video) return m.reply('❌ No encontré resultados.')
    const url = video.url
    const title = video.title
    const duration = video.timestamp
    const thumbnail = video.thumbnail

    const stream = ytdl(url, { filter: 'audioonly' })
    const filePath = `./temp/${title.replace(/[^a-zA-Z0-9]/gi, '')}.mp3`
    const writeStream = fs.createWriteStream(filePath)

    stream.pipe(writeStream)
    writeStream.on('finish', async () => {
      await conn.sendMessage(m.chat, {
        audio: fs.readFileSync(filePath),
        mimetype: 'audio/mp4',
        ptt: false,
        fileName: `${title}.mp3`
      }, { quoted: m })
      fs.unlinkSync(filePath)
    })
  } catch (e) {
    console.error(e)
    m.reply('❌ Ocurrió un error al procesar la canción.')
  }
}

handler.command = /^play2$/i
export default handler