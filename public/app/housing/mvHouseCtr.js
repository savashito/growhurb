angular.module('app').controller('mvHouseCtr',function($scope,$http,mvNotifier){
	// fetch data
	$scope.roommates = [
		{name:'Rodrigo',livesIn:'bigRoomSouth',lease:{start:new Date("October 13, 2014 11:13:00"),end:new Date("October 13, 2014 11:13:00")}},
		{name:'Charles',livesIn:'bigRoomSouth',date:new Date("October 13, 2014 11:13:00")},
		{name:'Jorge'  ,livesIn:'tinyRoom',date:new Date("October 13, 2014 11:13:00")}
		];
	$scope.rooms = {
		bigRoomSouth: {
			size:'Big',
			description: 'Beautiful room with two windows, and huge closet',
			rent: 325.0,
			occupants:2
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
		internet:{price:30.00},
		water:{price:27.0},
		electric:{price:80.0},
		gas:{price:43.0}
	};
	var rooms = $scope.rooms;
	totalOccupants = 0;
	// find the total number of occupants
	for (var i = rooms.length - 1; i >= 0; i--) {
		totalOccupants += rooms[i].occupants;
	};
	// calculate each humans rent

	
	// process the data
	roommates = $scope.roommates;
	for (var i = roommates.length - 1; i >= 0; i--) {
		var roommate = roommates[i];
		room = rooms[roommate.livesIn];
		roommate.rent = room.rent/room.occupants;
	};
	var services = $scope.services;
	services = $(services);
	console.log(services);
	services.each(function(service){
		service.unitPrice = service.price/totalOccupants;
		console.log(service.unitPrice);
	})
	// console.log(services.length );
	// for (var i = services.length - 1; i >= 0; i--) {
	// 	service = services[i];
	// 	service.unitPrice = service.price/totalOccupants;
	// 	console.log(sevice);
	// };
	console.log(services);

});