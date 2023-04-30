const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors')

const apiKey = 'AIzaSyDXye3RS_y8Zyvc0upyCMauSLe0wyiu8_0';
const url = 'https://translation.googleapis.com/language/translate/v2';

app.use(bodyParser.json());

// add cors origin
app.use(cors("*"))

app.post('/translate', (req, res) => {
  const text = req.body.q;
  const targetLanguage = req.body.target;

  const params = {
    key: apiKey,
    q: text,
    target: targetLanguage,
  };

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  request.post(
    {
      url: url,
      form: params,
      headers: headers,
    },
    (error, response, body) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to translate text' });
        return;
      }

      const responseObj = JSON.parse(body);
      const translation = responseObj.data.translations[0].translatedText;
      res.json({ translation: translation });
    }
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
