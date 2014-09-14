angular.module('app').controller('mvMainCtr',function($scope,$http,mvNotifier){

	$scope.summit = function (email){
		console.log('email ',email);
		$http.post('/summitemail',{email:email}).then(function(r){
			if(r.data.success){
				mvNotifier.notify('You have Successfully summited ',email,' email');
			}else{
				mvNotifier.notify('Server error! please try again. Sorry');
			}
		});
	}

})