const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { Client, LocalAuth  } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new LocalAuth()
});

const qrcode = require('qrcode-terminal');


let qr2 = `2@xZwNWDLQmfIUZRY6rZMMBOMsohNgxb5TL65KZE1oSzngtH7TLRJIJV/1URwvqCOPv7dlERdN157CyA==,xYmn0Q4yRqJJ0Alk3yix8tgAC/+z2TlmXJS5R2uQ10g=,yisVTG5JCOVG56Dj/7rEntHFhSzdt+VoWFq3CrbWFAw=,U+0EajPGWEHDZiq2vJlwlJ/KsjHNFd8tYFtNTo+qnzE=`;




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/', (req, res) => {
  client.sendMessage("5491169940853@c.us", "hola");
})


client.on('qr', (qrtxt) => {
  app.get('/', (req, res) => {
    var qr = require('qr-image');
   
    var qr_svg = qr.image(qrtxt, { type: 'svg' });
    qr_svg.pipe(require('fs').createWriteStream('i_love_qr.svg'));
    
    var svg_string = qr.imageSync(qrtxt, { type: 'svg' });
    res.send(svg_string);
  })
  // Generate and scan this code with your phone
  console.log('QR RECEIVED', qr);
  qrcode.generate(qr, {small: true});
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


