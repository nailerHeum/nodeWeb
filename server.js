const express = require('express');

var app = express();

app.get('/', (req, res) => {
  //res.send('<h1>Hello</h1>');
  res.send({
    name : 'Choi',
    city: 'Anyang',
    likes: [
      'pizza',
      'chicken'
    ]
  })
});
app.get('/about', (req, res) => {
  res.send('About page');
});



// / bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request.'
  });
});

app.listen(3000);