const handler = async (m, { command, usedPrefix }) => {
  m.reply(`⚔️ *Comando no encontrado*\nUsa usedPrefixmenu para ver la lista de comandos disponibles 🚀`);
;

handler.command = /^.+/; // Captura cualquier texto que parezca comando
handler.fail = null; // Desactiva mensajes de error por defecto
handler.customPrefix = /^\.([^\s]+)$/i; // Detecta comandos con punto (.)
handler.before = async (m) => {
  // Evita responder si el comando sí existe
  return false;
};

export default handler;