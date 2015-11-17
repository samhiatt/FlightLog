(function () {
	'use strict';

	/**
	 * Introduce the flightLogApp.admin.user.list module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngMaterial
	 * @requires {flightLogApp.socket}
	 * @requires flightLogApp.mainMenu
	 * @requires components/toggleComponent
	 * @requires flightLogApp.admin.user.list.detail
	 * @requires flightLogApp.admin.user.list.edit
	 * @requires flightLogApp.admin.user.list.items
	 */

	angular
		.module('flightLogApp.admin.user.list', [
			'ngMaterial',
			'ui.router',
			'flightLogApp.socket',
			'flightLogApp.mainMenu',
			'flightLogApp.toggleComponent',
			'flightLogApp.admin.user.list.detail',
			'flightLogApp.admin.user.list.edit',
			'flightLogApp.admin.user.list.items'
		])
		.config(configUserListRoutes);

	// inject configUserListRoutes dependencies
	configUserListRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the user.list state with the list template fpr the
	 * 'main' view paired with the UserListController as 'list'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configUserListRoutes($stateProvider, mainMenuProvider) {
		// The list state configuration
		var listState = {
			name: 'admin.user.list',
			parent: 'admin.user',
			url: '/',
			authenticate: true,
			role: 'admin',
			resolve: {users:  resolveUsers},
			views: {

				// target the unnamed view in the user state
				'@admin.user': {
					templateUrl: 'app/admin/user/list/list.html',
					controller: 'UserListController',
					controllerAs: 'list'
				},

				// target the content view in the admin.user.list state
				'content@admin.user.list': {
					templateUrl: 'app/admin/user/list/items/items.html',
					controller: 'UserItemsController',
					controllerAs: 'items'
				}
			}
		};

		$stateProvider.state(listState);

		mainMenuProvider.addSubMenuItem('admin.main', {
			name: 'Users',
			state: listState.name,
			order: Infinity
		});
	}

	// inject resolveUsers dependencies
	resolveUsers.$inject = ['User'];

	/**
	 * Resolve dependencies for the admin.user.list state
	 *
	 * @params {User} User - The service to query users
	 * @returns {Promise} A promise that, when fullfilled, returns an array of users
	 */
	function resolveUsers(User) {
		return User.query().$promise;
	}

})();
