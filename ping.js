const express = require('express');
const app = express();

const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.listen(port, () => {
  console.log(`WhatsApp API REST listening at http://localhost:${port}`);
});