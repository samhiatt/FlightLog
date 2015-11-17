(function () {
	'use strict';

	/**
	 * Introduce the flightLogApp.flight.list.detail submodule
	 * and configure it.
	 *
   * @requires ui.router
	 * @requires angularMoment
	 */

	angular
		.module('flightLogApp.flight.list.detail', [
			'ui.router',
			'angularMoment'
		])
		.config(configureFlightListDetail);

	// inject configFlightRoutes dependencies
	configureFlightListDetail.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the 'flight.detail' state with the detail template
	 * paired with the FlightDetailController as 'detail' for the
	 * 'sidenav' sub view.
	 * 'flight' is resolved as the flight with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureFlightListDetail($stateProvider) {
		// The detail state configuration
		var detailState = {
			name: 'flight.list.detail',
			parent: 'flight.list',
			url: '/:id',
			authenticate: true,
			role: 'user',
			onEnter: onEnterFlightListDetail,
			views: {
				'detail@flight.list': {
					templateUrl: 'app/flights/list/detail/detail.html',
					controller: 'FlightDetailController',
					controllerAs: 'detail',
					resolve: {flight: resolveFlightFromArray}
				}
			}
		};

		$stateProvider.state(detailState);
	}

	// inject onFlightListDetailEnter dependencies
	onEnterFlightListDetail.$inject = ['$timeout', 'ToggleComponent'];

	/**
	 * Executed when entering the flight.list.detail state. Open the component
	 * registered with the component id 'flight.detailView'.
	 *
 	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 */
	function onEnterFlightListDetail($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('flight.detailView').open();
		}
	}

	// inject resolveFlightFromArray dependencies
	resolveFlightFromArray.$inject = ['flights', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the flight.detail state
	 *
	 * @params {Array} flights - The array of flights
	 * @params {Object} $stateParams - The $stateParams to read the flight id from
	 * @returns {Object|null} The flight whose value of the _id property equals $stateParams._id
	 */
	function resolveFlightFromArray(flights, $stateParams, _) {
		return _.find(flights, {'_id': $stateParams.id});
	}

})();
