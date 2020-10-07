const express = require('express');
const router = express.Router();
const passport = require('passport');

const loggedUser = (req, res, next) => {
	if (!req.user) res.redirect('/user/no-permission');
	else next();
}

router.get('/logged', loggedUser, (req, res) => {
		res.render('logged', { name: req.user.displayName, photo: req.user.photos[0].value});
});

router.get('/profile', loggedUser, (req, res)=> {
		res.render('profile', { name: req.user.displayName });
});

router.get('/profile/settings', loggedUser, (req, res)=> {
		res.render('settings');
	});

router.get('/no-permission', (req, res) => {
	res.render('noPermission');
});


module.exports = router;