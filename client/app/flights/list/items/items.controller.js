(function () {
	'use strict';

	/**
	 * Register the list controller as FlightItemsController
	 */

	angular
		.module('flightLogApp.flight.list.items')
		.controller('FlightItemsController', FlightItemsController);

	// add FlightItemsController dependencies to inject
	FlightItemsController.$inject = ['$state'];

	/**
	 * FlightItemsController constructor
	 */
	function FlightItemsController($state) {
		var vm = this;

		// the selected item id
		var curFlightId = null;

		// check if this item is selected
		vm.isSelected = isSelected;
		// switch to the detail state
		vm.showInDetails = showInDetails;

		/**
		 * Check if the passed item is the current selected item
		 *
		 * @param {Object} flight - The object to check for selection
		 */
		function isSelected(flight) {
			return curFlightId === flight._id;
		}

		/**
		 * Open the detail state with the selected item
		 *
		 * @param {Object} flight - The flight to edit
		 */
		function showInDetails(flight) {
			curFlightId = flight._id;
			$state.go('flight.list.detail', {'id': curFlightId});
		}
	}

})();
