var mongoose = require('mongoose'),
		User 		 = mongoose.model('users');

module.exports = {
	register: function(req, res) {
		var newUser = new User(req.body)
		User.findOne({
			first_name: req.body.first_name
		}, function(err, dbUser) {
			if (err) {
				 res.json({
					 status: false,
					 errors: { 'reg': "Please enter a username with a minimum length of 3 characters."	}
				 })
			}	else if (dbUser) {
				res.json({
					status: false,
					errors: {	'reg': "You have already registered, please Log-In."	}
				})
			} else {
				newUser.save(function(err) {
					if (err) {
						res.json({
							status: false,
							errors: { 'reg': "Please enter a username with a minimum length of 2 characters."	}
						})
					} else {
						req.session['userInfo'] = {
							id: 				newUser.id,
							first_name: newUser.first_name
						}
						res.json({
							status: 	true,
							userInfo: req.session['userInfo']
						})
					}
				})
			}
		})
	},

	login: function(req, res) {
		User.findOne({
			first_name: req.body.first_name
		}, function(err, user) {
			if (err) {
				res.json({
					status: false,
					errors: err
				})
			} else if (user) {
				if (user.validUser(req.body.first_name)) {
					req.session['userInfo'] = {
						id: 				user.id,
						first_name: user.first_name
					}
					res.json({
						status: 	true,
						userInfo: req.session['userinfo']
					})
				} else {
					res.json({
						status: false,
						errors: "User does not exist, please register."
					})
				}
			} else {
				res.json({
					status: false,
					errors: "User does not exist, please register."
				})
			}
		})
	},

	logout: function(req, res) {
		req.session.destroy(function(err) {
			if (err) res.json({
				status: false,
				errors: err
			})
			res.json({ status: true	})
		})
	},

	session: function(req, res) {
		if (req.session['userInfo']) {
			res.json({
				status: 	true,
				userInfo: req.session['userInfo']
			})
		}	else {
			res.json({
				status: 	false,
				userinfo: null
			})
		}
	}

}
