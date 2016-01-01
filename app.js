const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('cookie-session');

apiRouter = express.Router();
app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.static(__dirname + '/app'));
app.use('/api', apiRouter);

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, DELETE, PUT, PATCH');
  res.setHeader('Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Authorization');
  next();
});

app.use(session({
  maxAge: 36000000,
  secret: 'hurhurhurhur',
  name: 'Shipmate'
}));

require('./controllers/index');

app.get('*', function(req, res) {
  res.render('index.html.ejs');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Server up @ ' +  3000);
});
