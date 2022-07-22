# WhatsApp HTTP API REST

This is a WhatsApp HTTP API REST based
It uses:
- pedroslopez whatsapp-web.js library (puppeteer, chromium)
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


## Usage

GET:/ Get QR

POST:/

{
  "password": "123456",
  "number": "5491169940853",
  "text": "Hola Mundo"
}

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)