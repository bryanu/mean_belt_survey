(function() {

	angular.module('myApp').factory('pollFactory', pfactory)

	function pfactory($http) {
		var pfactory = {}

		pfactory.allSurvey = function(callback) {
			$http.get('/allSurvey').then(function(data) {
					callback(data)
				})
		}

		pfactory.create = function(pollInfo) {
			return $http.post('/create', pollInfo).then(function(ret) {
				console.log("ret: ",ret.data)
				return ret;
				})
		}

		pfactory.getOne = function(surveyId, callback) {
			$http.get('/getOne/' + surveyId).then(function(data) {
					callback(data)
				})
		}

		pfactory.increaseVote = function(optionId, callback) {
			$http.post('/increaseVote/' + optionId).then(function(data) {
					callback(data)
				})
		}

		pfactory.delete = function(pollId, callback) {
			$http.post('/delete/' + pollId).then(function(data) {
					callback(data)
				})
		}

		return pfactory
	}
})()
