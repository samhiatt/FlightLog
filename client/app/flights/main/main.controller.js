(function () {
	'use strict';

	/**
	 * Register the list controller as FlightMainController
	 */

	angular
		.module('flightLogApp.flight.main')
		.controller('FlightMainController', FlightMainController);

	// add FlightMainController dependencies to inject
	FlightMainController.$inject = ['$state'];

	/**
	 * FlightMainController constructor
	 */
	function FlightMainController($state) {
		var vm = this;
		// switch to the list state
		vm.showList = showList;

		/**
		 * Activate the flight.list state
		 */
		function showList() {
			$state.go('flight.list');
		}
	}

})();
