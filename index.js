const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { Client, LocalAuth  } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new LocalAuth(),
});

const qr = require('qr-image');

app.listen(port, () => {
  console.log(`WhatsApp API REST listening at http://localhost:${port}`);
});

app.post('/', (req, res) => {
  client.sendMessage("5491169940853@c.us", "hola");
})


client.on('qr', (qrtxt) => {
  app.get('/', (req, res) => {
    let svg_string = qr.imageSync(qrtxt, { type: 'svg' });
    res.send(svg_string);
  })
  console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
  console.log('Client is ready!');
  client.sendMessage("5491169940853@c.us", "hola");
});

client.on('message', msg => {
  if (msg.body == '!ping') {
    msg.reply('pong');
  }
});

client.initialize();


