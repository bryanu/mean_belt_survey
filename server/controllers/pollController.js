var mongoose = require('mongoose'),
		Poll 		 = mongoose.model('polls'),
		Option   = mongoose.model('options');

module.exports = {
	create: function(req, res) {
		var newPoll = new Poll()
		var option1 = new Option({
			'option': req.body.option1,
			'_poll':  newPoll._id
		})
		var option2 = new Option({
			'option': req.body.option2,
			'_poll':  newPoll._id
		})
		var option3 = new Option({
			'option': req.body.option3,
			'_poll':  newPoll._id
		})
		var option4 = new Option({
			'option': req.body.option4,
			'_poll':  newPoll._id
		})

		newPoll.poll = req.body.question;
		newPoll._options = [option1, option2, option3, option4];
		newPoll._user = req.body.userName;

		option1.save(function(err) {
			var error  = false;
			var errors = [];

			if (err) {
				error = true;
				errors.push({
					errors: {
						kind:    'option1',
						message: 'Option #1 must be at least 3 characters.'
					}
				});
			}
			option2.save(function(err) {
				if (err) {
					error = true;
					errors.push({
						errors: {
							kind:    'option2',
							message: 'Option #2 must be at least 3 characters.'
						}
					});
				}
				option3.save(function(err) {
					if (err) {
						error = true;
						errors.push({
							errors: {
								kind:    'option3',
								message: 'Option #3 must be at least 3 characters.'
							}
						});
					}
					option4.save(function(err) {
						if (err) {
							error = true;
							errors.push({
								errors: {
									kind:    'option4',
									message: 'Option #4 must be at least 3 characters.'
								}
							});
						}
						if (!error) {
							newPoll.save(function(err) {
								if (err) {
									error = true;
									errors.push({
										errors: {
											kind:    'question',
											message: 'The question must be at least 8 characters long.'
										}
									});
								} else {
									res.json({ status: true	})
								}
							}) // newPoll.save
						} else {
							res.json(errors);
						} // !error - before newPoll.save
					}); // option4.save
				}); // option3 save
			}); // option2 save
		}); // option1 save
	}, // create

	allSurvey: function(req, res) {
		Poll.find({}).populate('_options').exec(function(err, surveys) {
			if (err) res.json({
				status: false,
				errors: err
			})
			else if (surveys) {
				res.json({
					status:     true,
					surveyInfo: surveys
				})
			}
		})
	},

	getOne: function(req, res) {
		Poll.findOne({
			_id: req.params.surveyId
		}).populate('_options').exec(function(err, survey) {
			if (err) res.json({
				status: false,
				errors: err
			})
			else if (survey) {
				res.json({
					status:     true,
					surveyInfo: survey
				})
			}
		})
	},

	increaseVote: function(req, res) {
		Option.findOne({
			_id: req.params.optionId
		}, function(err, option) {
			option.like++;
			option.save(function(err) {
				if (err) res.json({
					status: false,
					errors: err
				})
				else {
					res.json({
						status: true
					})
				}
			})
		})
	},

	delete: function(req, res) {
		Poll.remove({
			_id: req.params.pollId
		}, function(err) {
			if (err) res.json({
				status: false,
				errors: err
			})
			else {
				res.json({
					status: true
				})
			}
		})
	}

}
