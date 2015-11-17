/**
 * @ngdoc controller
 * @name flightLogApp.flight.create.controller:FlightCreateController
 * @description
 * Controller of the flight create page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the create controller as FlightCreateController
	 */

	angular
		.module('flightLogApp.flight.create')
		.controller('FlightCreateController', FlightCreateController);

	/**
	 * @ngdoc function
	 * @name flightLogApp.flight.create.provider:FlightCreateController
	 * @description
	 * Provider of the {@link flightLogApp.flight.create.controller:FlightCreateController FlightCreateController}
	 *
	 * @param {Service} Auth The Auth service to use
	 * @param {Service} $mdDialog The mdDialog service to use
	 * @param {Service} Flight The Flight resource
	 * @param {Service} FlightService The Flight service to use
	 * @param {Service} Toast The Toast service to use
	 * @returns {Service} {@link flightLogApp.flight.create.controller:FlightCreateController FlightCreateController}
	 */

	FlightCreateController.$inject = ['$mdDialog', 'Flight', 'FlightService', 'Toast'];

	function FlightCreateController($mdDialog, Flight, FlightService, Toast) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name flight
		 * @propertyOf flightLogApp.flight.create.controller:FlightCreateController
		 * @description
		 * The new flight data
		 *
		 * @returns {Object} The flight data
		 */
		vm.flight = new Flight();

		// view model bindings (documented below)
		vm.create = createFlight;
		vm.close = hideDialog;
		vm.cancel = cancelDialog;

		/**
		 * @ngdoc function
		 * @name createFlight
		 * @methodOf flightLogApp.flight.create.controller:FlightCreateController
		 * @description
		 * Create a new flight by using the FlightService create method
		 *
		 * @param {form} [form] The form to gather the information from
		 */
		function createFlight(form) {
			// refuse to work with invalid data
			if (vm.flight._id || (form && !form.$valid)) {
				return;
			}
			// TODO: Set startTime and endTime with given date
			// TODO: Get timezone from flying site model
			vm.flight.startTime = new Date(vm.flight.date+" "+vm.flight.startTime);
			vm.flight.endTime = new Date(vm.flight.date+" "+vm.flight.endTime);
			//vm.flight.date=new Date(vm.flight.date);

			FlightService.create(vm.flight)
				.then(createFlightSuccess)
				.catch(createFlightCatch);

			function createFlightSuccess(newFlight) {
				Toast.show({
					type: 'success',
					text: 'Flight ' + newFlight.name + ' has been created',
					link: {state: 'flight.list.detail', params: {id: newFlight._id}}
				});
				vm.close();
			}

			function createFlightCatch(err) {
				if (form && err) {
					form.setResponseErrors(err);
				}

				Toast.show({
					type: 'warn',
					text: 'Error while creating a new Flight'
				});
			}
		}

		/**
		 * @ngdoc function
		 * @name hide
		 * @methodOf flightLogApp.flight.create.controller:FlightCreateController
		 * @description
		 * Hide the dialog
		 */
		function hideDialog() {
			$mdDialog.hide();
		}

		/**
		 * @ngdoc function
		 * @name cancel
		 * @methodOf flightLogApp.flight.create.controller:FlightCreateController
		 * @description
		 * Cancel the dialog
		 */
		function cancelDialog() {
			$mdDialog.cancel();
		}
	}
})();
