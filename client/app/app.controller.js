/**
 * @ngdoc controller
 * @name flightLogApp.controller:AppController
 * @description
 * This is the application wide controller of the flightLogApp application
 */

(function () {
	'use strict';

	// register the controller as AppController
	angular
		.module('flightLogApp')
		.controller('AppController', AppController);

	/**
	 * @ngdoc function
	 * @name flightLogApp.provider:AppController
	 * @description
	 * Provider of the {@link flightLogApp.controller:AppController AppController}
	 *
	 * @param {Auth} Auth - The authentication service used for logging out
	 * @param {$location} $mdSidenav - The sidenav service used to communicate with the sidenav components
	 */

	AppController.$inject = ['Auth', '$mdSidenav'];

	function AppController(Auth, $mdSidenav) {
		var vm = this;

		vm.sidenavId = 'mainMenu';

		/**
		 * @ngdoc function
		 * @name logout
		 * @methodOf flightLogApp.controller:AppController
		 * @description
		 * Logout the current user
		 */
		vm.logout = Auth.logout;

		/**
		 * @ngdoc function
		 * @name isLoggedIn
		 * @methodOf flightLogApp.controller:AppController
		 * @description
		 * See {@link components/auth.service:Auth#isLoggedIn isLoggedIn} of the Auth service
		 */
		vm.isLoggedIn = Auth.isLoggedIn;

		/**
		 * @ngdoc function
		 * @name closeMainMenu
		 * @methodOf flightLogApp.controller:AppController
		 * @description
		 * Close the main menu sidenav component
		 * @returns {Promise} The promise from mdSidenav
		 */
		vm.closeMainMenu = closeMainMenu;

		/**
		 * @ngdoc function
		 * @name openMainMenu
		 * @methodOf flightLogApp.controller:AppController
		 * @description
		 * Open the main menu sidenav component
		 * @returns {Promise} The promise from mdSidenav
		 */
		vm.openMainMenu = openMainMenu;

		/**
		 * @ngdoc function
		 * @name currentUser
		 * @methodOf flightLogApp.controller:AppController
		 * @description
		 * See {@link components/auth.service:Auth#getCurrentUser getCurrentUser} of the Auth service
		 */
		vm.currentUser = Auth.getCurrentUser();

		/**
		 * Close the main menu sidenav component
		 */
		function closeMainMenu() {
			return $mdSidenav(vm.sidenavId).close();
		}

		/**
		 * Open the main menu sidenav component
		 */
		function openMainMenu() {
			return $mdSidenav(vm.sidenavId).open();
		}
	}
})();
