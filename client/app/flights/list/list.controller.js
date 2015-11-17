(function () {
	'use strict';

	/**
	 * Register the list controller as FlightListController
	 */
	angular
		.module('flightLogApp.flight.list')
		.controller('FlightListController', FlightListController);

	// add FlightListController dependencies to inject
	FlightListController.$inject = ['$scope', 'socket', '$state', 'flights', 'ToggleComponent'];

	/**
	 * FlightListController constructor
	 *
	 * @param {Object} $scope - The current scope
	 * @param {Object} socket - The socket service to register to
	 * @param {$state} $state - The $state to activate routing states on
	 * @param {Array} flights - The list of flights resolved for this route
	 * @param {Service} ToggleComponent - The service for switching the detail view
	 */
	function FlightListController($scope, socket, $state, flights, ToggleComponent) {
		var vm = this;

		// the array of flights
		vm.flights = flights;
		// toggle detail view
		vm.toggleDetails = toggleDetails;

		// initialize the controller
		activate();

		/**
		 * Register socket updates and unsync on scope $destroy event
		 */
		function activate() {
			socket.syncUpdates('flight', vm.flights);
			$scope.$on('$destroy', unsyncFlightUpdates);

			function unsyncFlightUpdates() {
				socket.unsyncUpdates('flight');
			}
		}

		/**
		 * Toggle the detail view
		 */
		function toggleDetails() {
			ToggleComponent('flight.detailView').toggle();
		}
	}

})();
