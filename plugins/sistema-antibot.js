// handler.js o donde manejes las bienvenidas
async function welcomeBotHandler(conn, participants, groupMetadata) {
  for (const user of participants) {
    const userJid = user.id || user;

    // Opcional: analiza si el nombre o JID parecen ser de un bot
    const userInfo = await conn.fetchStatus(userJid).catch(() => {});
    const isBotLike = userJid.includes('bot') || userInfo?.status?.toLowerCase().includes('bot');

    if (isBotLike) {
      const groupAdmins = (await conn.groupMetadata(groupMetadata.id)).participants
        .filter(p => p.admin)
        .map(p => p.id);

      const isAdmin = groupAdmins.includes(userJid);

      if (!isAdmin) {
        await conn.sendMessage(groupMetadata.id, { text: `⚠️ *Sistema no encontrado...* eliminando bot del grupo... ⚔️` }, { quoted: null });
        await conn.groupParticipantsUpdate(groupMetadata.id, [userJid], 'remove');
      }
    }
  }
}