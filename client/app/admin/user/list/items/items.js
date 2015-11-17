	/**
	 * @ngdoc overview
	 * @name flightLogApp.admin.user.list.items
	 * @requires ui.router
	 * @requires components/listImage
	 *
	 * @description
	 * The `flightLogApp.admin.user.list.items` module which provides:
	 *
	 * - {@link flightLogApp.admin.user.list.items.controller:UserItemsController UserItemsController}
	 */

(function () {
	'use strict';

	angular
		.module('flightLogApp.admin.user.list.items', [
			'ui.router',
			'flightLogApp.listImage'
		]);

})();
