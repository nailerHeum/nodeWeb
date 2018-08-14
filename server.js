const express = require('express');
const hbs = require('hbs');
const fs = require('fs'); 

const port = process.env.PORT || 3000;  // heroku & local
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log('Unable to append to server.log.');
  });
  next(); // log는 유지보수 시에도 남길 수 있다. 
})
// maintenance mode (유지보수 시에 켜놓으면 유지보수 페이지만 대체됨)
// next가 없기 때문에---------------------------------
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// }) 
//-------------------------------------------------
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website!!',
    
  });
});
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});
// / bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request.'
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});