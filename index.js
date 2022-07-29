const express = require('express');
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const { Client, LocalAuth  } = require('whatsapp-web.js');
const qrImage = require('qr-image');
const axios = require('axios');

const port = process.env.PORT || 4000;
const password = process.env.PASSWORD || "123456";
const url = process.env.URL || `http://localhost:${port}`;//'https://wp-api-rest.herokuapp.com';
const number = process.env.NUMBER || '1169940853';
const timer = process.env.TIMER || 10; //in minutes

const app = express();

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

//Keep alive
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.listen(port, () => {
  console.log(`WhatsApp API REST listening at http://localhost:${port}`);
});



client.on('qr', (qr) => {
  console.log('QR RECEIVED', qr);
  app.get('/qr', (req, res) => {
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
  client.sendMessage(`549${number}@c.us`, 'Client is ready!');
  setInterval(() => {
    axios.get(`${url}/ping`)
    .then(response => {
      console.log(response.data.url);
      console.log(response.data.explanation);
      client.sendMessage(`549${number}@c.us`, "I'm alive");
    })
    .catch(error => {
      console.log(error);
    });
  }, timer*60*1000);
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
  app.get('/ping', (req, res) => {
    try {
      client.sendMessage(`${number}@c.us`, 'pong');
      return res.send('pong');
    } catch (e) {
      return res.status(500).send();
    }
    
  });
});

client.on('message', msg => {
  if (msg.body == '!ping') {
    msg.reply('pong');
  }
});

client.initialize();


