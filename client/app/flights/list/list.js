(function () {
	'use strict';

	/**
	 * Introduce the flightLogApp.flight.list module
	 * and configure it.
	 * @requires ui.router
	 * @requires ngMaterial
	 * @requires flightLogApp.socket
	 * @requires flightLogApp.mainMenu,
	 * @requires flightLogApp.toggleComponent,
	 * @requires flightLogApp.flight.list.detail
	 * @requires flightLogApp.flight.list.edit
	 * @requires flightLogApp.flight.list.items
	 */

	angular
		.module('flightLogApp.flight.list', [
			'ngMaterial',
			'ui.router',
			'flightLogApp.socket',
			'flightLogApp.mainMenu',
			'flightLogApp.toggleComponent',
			'flightLogApp.flight.list.detail',
			'flightLogApp.flight.list.edit',
			'flightLogApp.flight.list.items'
		])
		.config(configFlightListRoutes);

	// inject configFlightListRoutes dependencies
	configFlightListRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the flight.list state with the list template fpr the
	 * 'main' view paired with the FlightListController as 'list'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configFlightListRoutes($stateProvider, mainMenuProvider) {
		// The list state configuration
		var listState = {
			name: 'flight.list',
			parent: 'flight',
			url: '/list',
			authenticate: true,
			role: 'user',
			resolve: {
				flights:  resolveFlights
			},
			views: {

				// target the unnamed view in the flight state
				'@flight': {
					templateUrl: 'app/flights/list/list.html',
					controller: 'FlightListController',
					controllerAs: 'list'
				},

				// target the content view in the flight.list state
				'content@flight.list': {
					templateUrl: 'app/flights/list/items/items.html',
					controller: 'FlightItemsController',
					controllerAs: 'items'
				}
			}
		};

		$stateProvider.state(listState);

		mainMenuProvider.addSubMenuItem('flight.main', {
			name: 'Flights List',
			state: listState.name
		});
	}

	// inject resolveFlights dependencies
	resolveFlights.$inject = ['Flight'];

	/**
	 * Resolve dependencies for the flight.list state
	 *
	 * @params {Flight} Flight - The service to query flights
	 * @returns {Promise} A promise that, when fullfilled, returns an array of flights
	 */
	function resolveFlights(Flight) {
		return Flight.query().$promise;
	}

})();
