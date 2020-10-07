const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const session = require('express-session');

// Passport config
passport.use(new GoogleStrategy({
  clientID: '711438492722-m605ebn1i9139vvha8to3pv19st2h92o.apps.googleusercontent.com',
  clientSecret: 'gn6h9GL2a_f25VDXS23CJcD2',
  callbackURL: 'http://localhost:8000/auth/callback'
},
  (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

const app = express();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/user/logged', (req, res) => {
  res.render('logged');
});

app.get('/user/no-permission', (req, res) => {
  res.render('noPermission');
});

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
