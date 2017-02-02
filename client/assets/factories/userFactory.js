(function() {

	angular.module('myApp').factory('userFactory', factory)

	function factory($http) {
		var factory = {}

		factory.getSession = function(callback) {
			$http.get('/session')
				.then(function(data) {
					callback(data)
				})
		}
		factory.login = function(userInfo, callback) {
			$http.post('/login', userInfo)
				.then(function(data) {
					callback(data)
				})
		}
		factory.register = function(userInfo, callback) {
			$http.post('/register', userInfo)
				.then(function(data) {
					callback(data)
				})
		}
		factory.logout = function(callback) {
			$http.post('/logout')
				.then(function(data) {
					callback(data)
				})
		}

		return factory
	}
})()
