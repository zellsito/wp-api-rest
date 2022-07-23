# WhatsApp HTTP API REST

This is a WhatsApp HTTP API REST made by zellsito
It uses:
- pedroslopez whatsapp-web.js library (puppeteer, chromium) wwebjs.dev
- NodeJS Express
- qr-image to render QR code to HTML


## Installation

```bash
npm start
```

or

```bash
npm run dev
```

## Installation with docker

```bash
docker build -t wp-http .
docker run --name wp-http -d -p 3000:3000 wp-http
```

or

```bash
docker-compose up -d
```

## Installation on Heroku

add buildpacks
- NodeJS
- Puppeteer https://elements.heroku.com/buildpacks/jontewks/puppeteer-heroku-buildpack

Don´t forget to add your app on
https://kaffeine.herokuapp.com/
to keep it alive

## Usage

Get QR
```bash
GET:/ 
```


Send messages
```bash
POST:/
```
```json
{
  "password": "123456",
  "number": "5491169940853",
  "text": "Hola Mundo"
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)