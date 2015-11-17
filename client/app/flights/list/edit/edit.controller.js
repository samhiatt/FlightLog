/**
 * @ngdoc controller
 * @name flightLogAppflight.list.edit.controller:FlightEditController
 * @description
 * Controller of the flight edit page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the edit controller as FlightEditController
	 */

	angular
		.module('flightLogApp.flight.list.edit')
		.controller('FlightEditController', FlightEditController);

	/**
	 * @ngdoc function
	 * @name flightLogAppflight.list.edit.provider:FlightEditController
	 * @description
	 * Provider of the {@link flightLogAppflight.list.edit.controller:FlightEditController FlightEditController}
	 * @param {Service} $state The state service to use
	 * @param {Service} $stateParams The stateParams service to use
	 * @param {Service} $mdDialog The dialog service to use
	 * @param {Service} Toast The Toast service to use
	 * @param {Service} FlightService The FlightService to use
	 * @param {Resource} flight The flight data to use
	 */

	FlightEditController.$inject = ['$state', '$stateParams', '$mdDialog', 'Toast', 'FlightService', 'flight'];

	function FlightEditController($state, $stateParams, $mdDialog, Toast, FlightService, flight) {
		var vm = this;

		// defaults
		vm.flight = angular.copy(flight, vm.flight);
		vm.displayName = flight.name;

		// view model bindings
		vm.update = update;
		vm.remove = remove;
		vm.goBack = goBack;
		vm.showList = showList;

		/**
		 * Open the detail state with the current flight
		 *
		 */
		function goBack() {
			$state.go('^.detail', {id: vm.flight._id});
		}

		/**
		 * Open the flight list state
		 *
		 */
		function showList() {
			$state.go('^');
		}
		/**
		 * Updates a flight by using the FlightService save method
		 * @param {Form} [form]
		 */
		function update(form) {
			// refuse to work with invalid data
			if (!vm.flight._id || form && !form.$valid) {
				return;
			}

			FlightService.update(vm.flight)
				.then(updateFlightSuccess)
				.catch(updateFlightCatch);

			function updateFlightSuccess(updatedFlight) {
				// update the display name after successful save
				vm.displayName = updatedFlight.name;
				Toast.show({text: 'Flight ' + vm.displayName + ' updated'});
				if (form) {
					form.$setPristine();
				}
			}

			function updateFlightCatch(err) {
				Toast.show({
					type: 'warn',
					text: 'Error while updating Flight ' + vm.displayName,
					link: {state: $state.$current, params: $stateParams}
				});

				if (form && err) {
					form.setResponseErrors(err.data);
				}
			}
		}

		/**
		 * Show a dialog to ask the flight if she wants to delete the current selected flight.
		 * @param {AngularForm} form - The form to pass to the remove handler
		 * @param {$event} ev - The event to pass to the dialog service
		 */
		function remove(form, ev) {
			var confirm = $mdDialog.confirm()
				.title('Delete flight ' + vm.displayName + '?')
				.content('Do you really want to delete flight ' + vm.displayName + '?')
				.ariaLabel('Delete flight')
				.ok('Delete flight')
				.cancel('Cancel')
				.targetEvent(ev);

			$mdDialog.show(confirm)
				.then(performRemove);

			/**
			 * Removes a flight by using the FlightService remove method
			 * @api private
			 */
			function performRemove() {
				FlightService.remove(vm.flight)
					.then(deleteFlightSuccess)
					.catch(deleteFlightCatch);

				function deleteFlightSuccess() {
					Toast.show({type: 'success', text: 'Flight ' + vm.displayName + ' deleted'});
					vm.showList();
				}

				function deleteFlightCatch(err) {
					Toast.show({
						type: 'warn',
						text: 'Error while deleting flight ' + vm.displayName,
						link: {state: $state.$current, params: $stateParams}
					});

					if (form && err) {
						form.setResponseErrors(err, vm.errors);
					}
				}
			}
		}
	}
})();
