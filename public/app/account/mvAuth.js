angular.module('app').factory('mvAuth',function($http,mvIdentity,$q){
	t = {
			checa:function(username,password){
				var dfd = $q.defer();
				$http.post('/login',{username:username,password:password}).then(function(r){
					if(r.data.success){
						mvIdentity.currentUser = r.data.user;
						dfd.resolve(true);
					}else{
						dfd.resolve(false);
					}
				});
				return dfd.promise;
			},
			logoutUser:function(){
				var dfd = $q.defer();
				$http.post('/logout',{logout:true}).then(function(){
					mvIdentity.currentUser = undefined;
					dfd.resolve(true);
				})

				return dfd.promise;
			}
	};
	return t;
});

/*authenticateUser: 

		function (username,password){
			// create a promise
			/*
			var dfd = $q.defer();
			$http.post('/login',{username:username,password:password}).then(function(r){
				if(r.data.success){
					mvIdentity.currentUser = r.data.user;
					dfd.resolve(true);
				}else{
					dfd.resolve(false);
				}
			});
			
			return dfd.promise;
			*/
//		}