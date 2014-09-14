	
angular.module('app').controller('mvEmailCtr',function($scope,$http,mvNotifier){

	$http.post('/retrieveemails',{}).then(function(r){	
			if(r.data.success){
				$scope.emails = r.data.emails;
			}
		});

	$scope.cursos = [
		{name:'Rodrigo',featured:true,date:new Date("October 13, 2014 11:13:00")},
		{name:'Tania',featured:true,date:new Date("October 13, 2014 11:13:00")},
		{name:'Doug',featured:true,date:new Date("October 13, 2014 11:13:00")},
		{name:'Melanie',featured:false,date:new Date("October 13, 2014 11:13:00")},
		{name:'Norma',featured:true,date:new Date("October 13, 2014 11:13:00")},
		{name:'Saiph',featured:true,date:new Date("October 13, 2014 11:13:00")},
		{name:'Biologia',featured:true,date:new Date("October 13, 2014 11:13:00")}
	]
});