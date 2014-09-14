angular.module('app').controller('mvNavbarCtrl',function($scope,$http,mvIdentity,mvNotifier,mvAuth,$location){
	$scope.identity = mvIdentity;
	$scope.signin = function(username,password){
		console.log('mvAuth',mvAuth);
		mvAuth.checa(username,password).then(function(success){
			if(success){
				mvNotifier.notify('Successfully log in');
			}else{
				mvNotifier.notify('Username is incorrect');
			}
		})

	}


	$scope.signout = function(){
		mvAuth.logoutUser().then(function(){
			// clearout fields
			$scope.username='';
			$scope.password='';
			mvNotifier.notify('You have Successfully logout :)');
			// redirect back to the homepage
			$location.path('/');
		})
	}

});