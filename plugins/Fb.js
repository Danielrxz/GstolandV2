import { exec } from 'child_process'
import fs from 'fs'

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) return m.reply(`🎬 Usa así: usedPrefix + command [link de Facebook]`)

  m.reply('⏳ Descargando video de Facebook, espera un momento...')

  exec(`yt-dlp -o fbvideo.mp4 "{text}"`, async (err, stdout, stderr) => {
    if (err) return m.reply('❌ Error al descargar el video. Asegúrate que el enlace sea público.')

    if (!fs.existsSync('./fbvideo.mp4')) return m.reply('❌ No se encontró el archivo descargado.')

    await conn.sendFile(m.chat, './fbvideo.mp4', 'fbvideo.mp4', '✅ Aquí tienes tu video de Facebook.', m)

    fs.unlinkSync('./fbvideo.mp4') // elimina el archivo luego de enviarlo
  })
}

handler.command = /^fb$/i
export default handler