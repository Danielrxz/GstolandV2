import fetch from 'node-fetch'

const handler = async (m, { args, text, usedPrefix, command }) => {
  if (!text) return m.reply(`📦 Usa así: usedPrefix + command Spotify`)

  m.reply('🔍 Buscando la APK en Aptoide...')

  try 
    const res = await fetch(`https://web-api.aptoide.com/api/7/apps/search?query={encodeURIComponent(text)}&limit=1`)
    const json = await res.json()

    if (!json || !json.datalist || !json.datalist.list.length)
      return m.reply('❌ No encontré ninguna app con ese nombre.')

    const app = json.datalist.list[0]
    const name = app.name
    const summary = app.summary || 'Sin descripción.'
    const icon = app.icon
    const dlLink = app.file.path

    await conn.sendMessage(m.chat, {
      image: { url: icon },
      caption: `📱 *name*📝{summary}\n\n🔗 *Descarga directa:*\ndlLink`
    ,  quoted: m )

   catch (e) 
    console.error(e)
    m.reply('❌ Error al buscar la APK.')
  

handler.command = /^apk/i
export default handler