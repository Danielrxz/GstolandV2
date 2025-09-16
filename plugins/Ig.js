import fetch from 'node-fetch'

const handler = async (m, { args, usedPrefix, command, conn }) => {
  if (!args[0]) return m.reply(`📸 Usa: usedPrefix + command <link de Instagram>`)

  m.reply('⏳ Descargando contenido de Instagram, espera...')

  try 
    const res = await fetch(`https://api.lolhuman.xyz/api/instagram2?apikey=GataDios   url={args[0]}`)
    const json = await res.json()

    if (!json.result || json.result.length === 0) {
      return m.reply('❌ No se pudo obtener el contenido.')
    }

    for (let media of json.result) {
      await conn.sendFile(m.chat, media, 'ig.mp4', '', m)
    }
  } catch (e) {
    console.error(e)
    m.reply('❌ Ocurrió un error. Asegúrate que el enlace sea de una cuenta pública.')
  }
}

handler.command = /^ig$/i
export default handler