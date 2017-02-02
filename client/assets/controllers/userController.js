(function() {

	angular.module('myApp').controller('usersController', usersCtrl)

	function usersCtrl(userFactory, $location, $rootScope) {
		var self = this
		self.errors = []

		function getSession(callback) {
			$rootScope.loggedIn = false;
			userFactory.getSession(function(data) {
				self.user = data.data.userInfo
				callback(self.user)
			})
		}

		getSession(function(user) {
			if (!self.user) {
				$rootScope.loggedIn = false;
				$location.url('/')
			} else {
				$rootScope.currentusername = self.user.first_name;
				$rootScope.loggedIn = true;
			}
		})

		self.register = function() {
			self.errors = []
			$rootScope.loggedIn = false;
			userFactory.register(self.regInfo, function(data) {
				if (data.data.status) {
					self.user = data.data.userInfo
					$rootScope.loggedIn = true;
					$location.url('/dashboard')
				} else {
					self.errors = data.data.errors
					self.regInfo.first_name = ""
				}
			})
		}

		self.login = function() {
			self.errors = []
			userFactory.login(self.loginInfo, function(data) {
				if (data.data.status) {
					self.user = data.data.userInfo
					$rootScope.loggedIn = true;
					$location.url('/dashboard')
				} else {
					self.errors = data.data.errors
					$rootScope.loggedIn = false;
					self.loginInfo.first_name = ""
				}
			})
		}

		self.logout = function() {
			console.log("logout called")
			userFactory.logout(function(data) {
				$rootScope.loggedIn = false;
				if (data.data.status) {
					$rootScope.currentusername = "";
					$location.url('/')
				} else {
					self.errors = data.data.errors
				}
			})
		}

	}
})()
