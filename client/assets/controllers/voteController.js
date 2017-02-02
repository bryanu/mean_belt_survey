(function(){

	angular.module('myApp').controller('votesController', votesCtrl)

	function votesCtrl(pollFactory, $location, $routeParams, $route){
		var self = this
		self.errors = []

		function getOne(surveyId){
			pollFactory.getOne(surveyId, function(factoryData){
				self.survey = factoryData.data.surveyInfo
			})
		}
		getOne($routeParams.id)

		self.increaseVote = function(optionId){
			self.errors = []
			pollFactory.increaseVote(optionId, function(factoryData){
				if(factoryData.data.status){
					$route.reload()
				}else{
					self.errors = factoryData.data.errors
				}
			})
		}
		
	}
})()
