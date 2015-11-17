(function () {
	'use strict';

	/**
	 * Introduce the flightLogApp.flight.service module.
	 * Register the flight resource as Flight, register the
	 * service as FlightService.
	 *
	 * @requires {flightLogApp.resource}
	 */
	angular
		.module('flightLogApp.flight.service', ['flightLogApp.resource'])
		.factory('Flight', Flight)
		.service('FlightService', FlightService);

	// add Flight dependencies to inject
	Flight.$inject = ['Resource'];

	/**
	 * Flight resource constructor
	 */
	function Flight($resource) {
		// factory members
		var apiURL = '/api/flights';
		// public API
		return $resource(apiURL + '/:id/:controller');
	}

	// add FlightService dependencies to inject
	FlightService.$inject = ['Flight'];

	/**
	 * FlightService constructor
	 * AngularJS will instantiate a singleton by calling "new" on this function
	 *
	 * @param {$resource} Flight The resource provided by flightLogApp.flight.resource
	 * @returns {Object} The service definition for the FlightService service
	 */
	function FlightService(Flight) {

		return {
			create: create,
			update: update,
			remove: remove
		};

		/**
		 * Save a new flight
		 *
		 * @param  {Object}   flight - flightData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function create(flight, callback) {
			var cb = callback || angular.noop;

			return Flight.create(flight,
				function (flight) {
					return cb(flight);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * Remove a flight
		 *
		 * @param  {Object}   flight - flightData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function remove(flight, callback) {
			var cb = callback || angular.noop;

			return Flight.remove({id: flight._id},
				function (flight) {
					return cb(flight);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * Create a new flight
		 *
		 * @param  {Object}   flight - flightData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function update(flight, callback) {
			var cb = callback || angular.noop;

			return Flight.update(flight,
				function (flight) {
					return cb(flight);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}
	};
})();
