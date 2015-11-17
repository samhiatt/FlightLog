(function () {
	'use strict';

	/**
	 * Register the edit controller as FlightDetailController
 	 */

	angular
		.module('flightLogApp.flight.list.detail')
		.controller('FlightDetailController', FlightDetailController);

	// add FlightDetailController dependencies to inject
	FlightDetailController.$inject = ['$state', 'flight'];

	/**
	 * FlightDetailController constructor
	 */
	function FlightDetailController($state, flight) {
		var vm = this;

		// the current flight to display
		vm.flight = flight;
		// switch to the edit state
		vm.edit = edit;
		// switch to the parent state
		vm.goBack = goBack;

		/**
		 * Open the edit state with the current flight
		 *
		 */
		function edit() {
			$state.go('^.edit', {'id': vm.flight._id});
		}

		/**
		 * Return to the parent state
		 *
		 */
		function goBack() {
			$state.go('^');
		}
	}
})();
