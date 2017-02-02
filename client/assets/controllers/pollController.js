(function(){
	angular.module('myApp').controller('pollsController', pollsCtrl)

	function pollsCtrl(pollFactory, $location, $routeParams, $route){
		var self 	  = this
		self.errors = []

		function allSurveys(){
			pollFactory.allSurvey(function(factoryData){
				self.surveys = factoryData.data.surveyInfo
			})
		}
		allSurveys()

		self.create = function(userName){
			self.errors = []
			self.pollErrors = [];
			if(self.pollInfo){
				self.pollInfo.userName = userName
				console.log("Calling create",self.pollInfo)
				pollFactory.create(self.pollInfo).then( function(data){
					console.log("Factory Data",data)
					if(data.data.status){
						$location.url('/dashboard')
					} else {
						var errorsv = data.data;
						for (key in errorsv){
							console.log(errorsv[key].errors.kind,  errorsv[key].errors.message);
							self.pollErrors[errorsv[key].errors.kind] = errorsv[key].errors.message
						}
					}
				})
			} else {
				self.errors = "Please complete the Form."
			}
		}

		self.delete = function(pollId){
			self.errors = []
			pollFactory.delete(pollId, function(factoryData){
				if(factoryData.data.status){
					$route.reload()
				}else{
					self.errors = factoryData.data.errors
				}
			})
		}
	}
})()
