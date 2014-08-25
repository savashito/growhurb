angular.module('app',['ngResource','ngRoute']);

angular.module('app').config(['$routeProvider','$locationProvider',
	function($routeProvider,
			 $locationProvider){
		$locationProvider.html5Mode (true);	
		$routeProvider
			.when('/',{templateUrl:'/partials/main',controller:'mainCtr'})
	}]);

angular.module('app').controller('mainCtr',function($scope){
	$scope.myVar= 'miauuu';
})