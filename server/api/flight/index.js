/**
 * Module for handling flight requests.
 * Initializing the [FlightController]{@link flight:controller~FlightController}
 * and configuring the express router to handle the flight api
 * for /api/flights routes. All Routes are registered after the
 * [request parameters]{@link flight:parameters} have been
 * added to the router instance.
 * Exports the configured express router for the flight api routes
 * @module {express.Router} flight
 * @requires {@link module:middleware}
 * @requires {@link flight:controller~FlightController}
 */
'use strict';

var router = require('express').Router();
var contextService = require('request-context');
var middleware = require('../../lib/middleware');
var FlightController = require('./flight.controller');
var auth = require('../../lib/auth/auth.service');

// Export the configured express router for the flight api routes
module.exports = router;

/**
 * The api controller
 * @type {flight:controller~FlightController}
 */
var controller = new FlightController(router);

// register flight route parameters, uncomment if needed
// var registerFlightParameters = require('./flight.params');
// registerFlightParameters(router);

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');

// add the authenticated user to the created acl context
var addUserContext = auth.addAuthContext('request:acl.user');

// check if the request is made by an authenticated user with at least the user role
var isAuthenticated = auth.hasRole('user');

// apply auth middleware to all routes
router.route('*').all(addRequestContext, isAuthenticated, addUserContext);

// register flight routes
router.route('/')
	.get(controller.index)
	.post(controller.create);

router.route('/' + controller.paramString)
	.get(controller.show)
	.delete(controller.destroy)
	.put(controller.update)
	.patch(controller.update);
