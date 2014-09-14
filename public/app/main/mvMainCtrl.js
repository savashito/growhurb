angular.module('app').controller('mvMainCtr',function($scope,$http,mvNotifier){
	$scope.cursos = [
		{name:'Rodrigo',featured:true,date:new Date("October 13, 2014 11:13:00")},
		{name:'Tania',featured:true,date:new Date("October 13, 2014 11:13:00")},
		{name:'Doug',featured:true,date:new Date("October 13, 2014 11:13:00")},
		{name:'Melanie',featured:false,date:new Date("October 13, 2014 11:13:00")},
		{name:'Norma',featured:true,date:new Date("October 13, 2014 11:13:00")},
		{name:'Saiph',featured:true,date:new Date("October 13, 2014 11:13:00")},
		{name:'Biologia',featured:true,date:new Date("October 13, 2014 11:13:00")}
	]
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