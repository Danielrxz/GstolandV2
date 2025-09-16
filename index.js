import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  generateLinkPreview,
  jidDecode,
  makeCacheableSignalKeyStore,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import readline from 'readline';
import { useRemoteFileAuthState } from './lib/RemoteAuth.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));

const startSock = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const { version } = await fetchLatestBaileysVersion();

  console.log(`Seleccione una opción:`);
  console.log(`1. Con código QR`);
  console.log(`2. Con código de texto de 8 dígitos\n`);

  const opt = await question('==> ');

  let socket;

  if (opt == '1') {
    socket = makeWASocket({
      logger: pino({ level: 'silent' }),
      printQRInTerminal: true,
      browser: ['Chrome', 'Abontu', '1.0.0'],
      auth: state,
      version,
    });
  } else if (opt == '2') {
    socket = makeWASocket({
      logger: pino({ level: 'silent' }),
      auth: state,
      browser: ['Gatoland Bot', 'Chrome', '1.0.0'],
      version,
      generateHighQualityLinkPreview: true,
      getMessage: async (key) => ({ conversation: '📨 Mensaje no encontrado' }),
    });

    if (!socket.authState.creds.registered) {
      const code = await socket.requestPairingCode('52xxxxxxxxxx@s.whatsapp.net');
      console.log(`✿ *Vincula el Socket usando el código de 8 dígitos.*`);
      console.log(`✎ Código: ${code}\n`);
      console.log(`⚠️ Expira en 60 segundos...`);
    }
  } else {
    console.log('Opción inválida');
    process.exit(0);
  }

  socket.ev.on('creds.update', saveCreds);
};

startSock();