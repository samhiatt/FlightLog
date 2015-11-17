(function () {
	'use strict';

	/**
	 * Introduce the flightLogApp.flight.main module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires flightLogApp.mainMenu
	 */

	angular
		.module('flightLogApp.flight.main', [
			'ui.router',
			'flightLogApp.mainMenu'
		])
		.config(configFlightMainRoutes);

	// inject configFlightMainRoutes dependencies
	configFlightMainRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the flight.main state with the list template for the
	 * 'main' view paired with the FlightMainController as 'main'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 * @param {mainMenuProvider} mainMenuProvider - The service to pass navigation information to
	 */
	function configFlightMainRoutes($stateProvider, mainMenuProvider) {
		// The main state configuration
		var mainState = {
			name: 'flight.main',
			parent: 'flight',
			url: '/',
			authenticate: true,
			role: 'user',
			views: {
				'@flight': {
					templateUrl: 'app/flights/main/main.html',
					controller: 'FlightMainController',
					controllerAs: 'main'
				}
			}
		};

		$stateProvider.state(mainState);

		mainMenuProvider.addMenuItem({
			name: 'Flights',
			state: mainState.name,
			role: 'user'
		});
	}

})();
