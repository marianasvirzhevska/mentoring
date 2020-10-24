import express = require('express');
import { Request, Response } from 'express';

const app = express();

app.get('/', function (request: Request, response: Response) {
  if (request.body) {
    console.log('request');
  }

  response.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Hello, World!');
});
