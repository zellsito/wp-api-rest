const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const { Client, LocalAuth  } = require('whatsapp-web.js');
const client = new Client(/*{
  
}*/
{ authStrategy: new LocalAuth(), puppeteer: { headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox']}});

const qrImage = require('qr-image');

app.listen(port, () => {
  console.log(`WhatsApp API REST listening at http://localhost:${port}`);
});



client.on('qr', (qr) => {
  app.get('/', (req, res) => {
    let svg_string = qrImage.imageSync(qr, { type: 'svg' });
    res.send(svg_string);
  })
  console.log('QR RECEIVED', qr);

});

client.on('ready', () => {
  console.log('Client is ready!');
  app.post('/', (req, res) => {
    if (req.body.password != '123456') {
      res.status(403).send();  
    }
    try {
      client.sendMessage(`${req.body.number}@c.us`, req.body.text);
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
    res.send();
  });
});

client.on('message', msg => {
  if (msg.body == '!ping') {
    msg.reply('pong');
  }
});

client.initialize();


