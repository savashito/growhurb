angular.module('app',['ngResource','ngRoute']);

angular.module('app').config(['$routeProvider','$locationProvider',
	function($routeProvider,
			 $locationProvider){
		$locationProvider.html5Mode (true);	
		$routeProvider
			.when('/',{templateUrl:'/partials/main/main',controller:'mvMainCtr'})
			.when('/mex',{templateUrl:'/partials/main/mainMex',controller:'mvMainCtr'})
			.when('/emails',{templateUrl:'/partials/email/emails',controller:'mvEmailCtr'})
			.when('/team',{templateUrl:'/partials/email/emails',controller:'mvTeamCtr'})
			.when('/housing',{templateUrl:'/partials/housing/house',controller:'mvHouseCtr'})
	}]);

