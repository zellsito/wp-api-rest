const express = require('express');
const app = express();
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const password = process.env.PASSWORD || "123456";

const { Client, LocalAuth  } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
    ],
  },
});

const qrImage = require('qr-image');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.listen(port, () => {
  console.log(`WhatsApp API REST listening at http://localhost:${port}`);
});



client.on('qr', (qr) => {
  console.log('QR RECEIVED', qr);
  app.get('/', (req, res) => {
    try {
      let svg_string = qrImage.imageSync(qr, { type: 'svg' });  
      return res.send(svg_string);
    } catch (e) {
      return res.status(500).send();
    }
    
  });
});

client.on('ready', () => {
  console.log('Client is ready!');
  app.post('/',
  body('password').isLength({ min: 6 }),
  body('number').isLength({ min: 6 }),
  body('text').isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({
          success: false,
          errors: errors.array()
        });
    }

    console.log(req.body);

    if (req.body.password != password){
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


