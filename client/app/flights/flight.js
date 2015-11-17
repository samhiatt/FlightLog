(function () {
	'use strict';

	/**
	 * Introduce the flightLogApp.flight module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngResource
	 * @requires flightLogApp.flight.main
	 * @requires flightLogApp.flight.list
	 * @requires flightLogApp.flight.create
	 */
	angular
		.module('flightLogApp.flight', [
			'ngResource',
			'ui.router',
			'flightLogApp.flight.main',
			'flightLogApp.flight.list',
			'flightLogApp.flight.create'
		])
		.config(configFlightRoutes);

	// inject configFlightRoutes dependencies
	configFlightRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the abstract flight state with the flight template
	 * paired with the FlightController as 'index'.
	 * The injectable 'flights' is resolved as a list of all flights
	 * and can be injected in all sub controllers.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configFlightRoutes($urlRouterProvider, $stateProvider) {
		// The flight state configuration
		var flightState = {
			name: 'flight',
			url: '/flights',
			abstract: true,
			templateUrl: 'app/flights/flight.html',
			controller: 'FlightController',
			controllerAs: 'index'
		};

		$urlRouterProvider.when('/flight', '/flight/');
		$stateProvider.state(flightState);
	}

})();
