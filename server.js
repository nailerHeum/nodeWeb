const express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

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

app.listen(3000, () => {
  console.log('server is up on port 3000');
});