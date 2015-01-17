angular.module('app').controller('mvHouseCtr',function($scope,$http,mvNotifier){
	// fetch data
	$scope.roommates = [
		{name:'Rodrigo',livesIn:'MediumRoom',lease:{start:new Date("October 13, 2014 11:13:00"),end:new Date("October 13, 2014 11:13:00")}},
		{name:'Charles',livesIn:'bigRoomSouth',date:new Date("October 13, 2014 11:13:00")},
		{name:'Jorge'  ,livesIn:'tinyRoom',date:new Date("October 13, 2014 11:13:00")},
		{name:'Sowan'  ,livesIn:'bigRoomNorth',date:new Date("October 13, 2014 11:13:00")}
		];
	$scope.rooms = {
		bigRoomSouth: {
			size:'Big',
			description: 'Beautiful room with two windows, and huge closet',
			rent: 325.0,
			occupants:1
		},
		bigRoomNorth: {
			size:'Big',
			description: 'Beautiful room with two windows, and huge closet',
			rent: 325.0,
			occupants:1
		},
		MediumRoom:{
			size:'Medium',
			description: 'Beautiful room with huge window, no closet',
			rent: 270.0,
			occupants:1
		},
		tinyRoom:{
			size:'tiny',
			description: 'tiny room with one window, no closet',
			rent: 230.0,
			occupants:1
		}
	}
	$scope.services = {
		internet:{price:35.77,due: new Date(2015, 0, 15) },
		water:{price:0.0},
		electric:{price:0.0},
		gas:{price:65.98,due: new Date(2015, 0, 23) }
	};
	$scope.servicesPaid = {
		'Rodrigo': {rent:true,internet:true,water:false,electric:false,gas:false},
		'Charles': {rent:true,internet:false,water:false,electric:false,gas:false},
		'Sowan':   {rent:true,internet:true,water:false,electric:false,gas:false},
		'Jorge'  : {rent:true,internet:true,water:false,electric:false,gas:false}
		// ,
		// rent:true,gas:true,internet:false
	}
// servicesP said[person.name].rent

	var rooms = $scope.rooms;
	totalOccupants = 0;
	// find the total number of occupants
	for (roomName in rooms){
		room = rooms[roomName];
		totalOccupants += room.occupants;
	}
	console.log(totalOccupants);
	// calculate each humans rent

	
	// process the data
	roommates = $scope.roommates;
	for (var i = roommates.length - 1; i >= 0; i--) {
		var roommate = roommates[i];
		room = rooms[roommate.livesIn];
		roommate.rent = room.rent/room.occupants;
	};
	var services = $scope.services;
	// services = $(services);
	console.log(totalOccupants);
	for (var serviceKey in services){
		service = services[serviceKey];
		service.unitPrice = ((service.price+0.01)/totalOccupants).toFixed(2);	
		console.log(service.price);
	}
	/*
	services.forEach(function(service){
		service.unitPrice = service.price/totalOccupants;

		console.log(service.unitPrice);
	})*/
	// console.log(services.length );
	// for (var i = services.length - 1; i >= 0; i--) {
	// 	service = services[i];
	// 	service.unitPrice = service.price/totalOccupants;
	// 	console.log(sevice);
	// };
	// console.log(services);

});