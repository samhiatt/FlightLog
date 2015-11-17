(function () {
	'use strict';

	/**
	 * Introduce the flightLogApp.flight.list.edit module
	 * and configure it.
	 *
	 * @requires 'ui.router',
	 * @requires 'ngMaterial',
	 * @requires flightLogApp.mongooseError
	 * @requires flightLogApp.flight.service
	 */

	angular
		.module('flightLogApp.flight.list.edit', [
			'ui.router',
			'ngMaterial',
			'flightLogApp.mongooseError',
			'flightLogApp.flight.service'
		])
		.config(configureFlightListEdit);

	// inject configFlightListEdit dependencies
	configureFlightListEdit.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the flight.list.edit state with the edit template
	 * paired with the FlightEditController as 'edit' for the
	 * 'detail@flight.list' view.
	 * 'flight' is resolved as the flight with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureFlightListEdit($stateProvider) {
		// The edit state configuration.
		var editState = {
			name: 'flight.list.edit',
			parent: 'flight.list',
			url: '/edit/:id',
			authenticate: true,
			role: 'user',
			onEnter: onEnterFlightListEdit,
			views: {
				'detail@flight.list': {
					templateUrl: 'app/flights/list/edit/edit.html',
					controller: 'FlightEditController',
					controllerAs: 'edit',
					resolve: {flight: resolveFlightFromArray}
				}
			}
		};

		$stateProvider.state(editState);
	}

	// inject onFlightListEditEnter dependencies
	onEnterFlightListEdit.$inject = ['$timeout', 'ToggleComponent'];

	/**
	 * Executed when entering the flight.list.detail state. Open the component
	 * registered with the component id 'flight.detailView'.
	 *
	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 */
	function onEnterFlightListEdit($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('flight.detailView').open();
		}
	}

	// inject resolveFlightDetailRoute dependencies
	resolveFlightFromArray.$inject = ['flights', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the flight.list.edit state. Get the flight
	 * from the injected Array of flights by using the '_id' property.
	 *
	 * @params {Array} flights - The array of flights
	 * @params {Object} $stateParams - The $stateParams to read the flight id from
	 * @params {Object} _ - The lodash service to find the requested flight
	 * @returns {Object|null} The flight whose value of the _id property equals $stateParams._id
	 */
	function resolveFlightFromArray(flights, $stateParams, _) {
		//	return Flight.get({id: $stateParams.id}).$promise;
		return _.find(flights, {'_id': $stateParams.id});
	}

})();
