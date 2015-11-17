(function () {
	'use strict';

	// register the controller as FlightController
	angular
		.module('flightLogApp.flight')
		.controller('FlightController', FlightController);

	// add FlightController dependencies to inject
	// FlightController.$inject = [];

	/**
	 * FlightController constructor. Main controller for the flightLogApp.flight
	 * module.
	 *
	 * @param {$scope} $scope - The scope to listen for events
	 * @param {socket.io} socket - The socket to register updates
	 */
	function FlightController() {
		// var vm = this;
	}

})();
