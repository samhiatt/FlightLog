(function () {
	'use strict';

	/**
	 * Introduce the flightLogApp.flight.create module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngMessages
	 * @requires ngMaterial
	 * @requires {flightLogApp.mongooseError}
	 * @requires {flightLogApp.remoteUnique}
	 * @requires {flightLogApp.flight.service}
	 */

	angular
		.module('flightLogApp.flight.create', [
			'ui.router',
			'ngMessages',
			'ngMaterial',
			'flightLogApp.mongooseError',
			'flightLogApp.remoteUnique',
			'flightLogApp.flight.service'
		])
		.config(configureFlightCreateRoutes);

	// inject configFlight.CreateRoutes dependencies
	configureFlightCreateRoutes.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the 'flight.list.create' state. The onEnterFlightListCreateView
	 * function will be called when entering the state and open a modal dialog
	 * with the app/flights/create/create.html template loaded.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureFlightCreateRoutes($stateProvider) {
		var  createListState = {
			name: 'flight.list.create',
			parent: 'flight.list',
			url: '/create',
			authenticate: true,
			role: 'user',
			onEnter: onEnterFlightListCreateView
		};

		$stateProvider.state(createListState);
	}

	/**
	 * Function that executes when entering the flight.list.create state.
	 * Open the create dialog
	 */

	onEnterFlightListCreateView.$inject = ['$rootScope', '$state', '$mdDialog'];

	function onEnterFlightListCreateView($rootScope, $state, $mdDialog) {
		var unregisterListener = $rootScope.$on('$stateChangeStart', onStateChange);

		$mdDialog.show({
			controller: 'FlightCreateController',
			controllerAs: 'create',
			templateUrl: 'app/flights/create/create.html',
			clickOutsideToClose: false
		}).then(transitionTo, transitionTo);

		/**
		 * Function executed when resolving or rejecting the
		 * dialog promise.
		 *
		 * @param {*} answer - The result of the dialog callback
		 * @returns {promise}
		 */
		function transitionTo(answer) {
			return $state.transitionTo('flight.list');
		}

		/**
		 * Function executed when changing the state.
		 * Closes the create dialog
		 */
		function onStateChange() {
			unregisterListener();
			$mdDialog.hide();
		}
	}

})();
