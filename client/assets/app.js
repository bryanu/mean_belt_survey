(function(){

angular.module('myApp', ['ngRoute']).config(config)

	function config($routeProvider){ $routeProvider
		.when('/', {
			templateUrl: '/assets/partials/login.html'
		})
		.when('/dashboard', {
			templateUrl: '/assets/partials/dashboard.html'
		})
		.when('/createPoll', {
			templateUrl: '/assets/partials/newPoll.html'
		})
		.when('/vote/:id', {
			templateUrl: '/assets/partials/vote.html',
			controller:  'usersController'
		})
		.otherwise({
			redirectTo: '/'
		})

	}
})()
