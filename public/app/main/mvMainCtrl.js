angular.module('app').controller('mvMainCtr',function($scope,$http,mvNotifier){

	$scope.summit = function (email,location){
		console.log('email ',email,location);
		$http.post('/summitemail',{email:email,location:location}).then(function(r){
			if(r.data.success){
				mvNotifier.notify('You have Successfully summited ',email,' email');
				$scope.email = '';
			}else{
				mvNotifier.notify('Server error! please try again. Sorry');
			}
		});
	}

})