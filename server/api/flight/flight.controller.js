/**
 * Module for the controller definition of the flight api.
 * The FlightController is handling /api/flights requests.
 * @module {flight:controller~FlightController} flight:controller
 * @requires {@link ParamController}
 */
'use strict';

module.exports = FlightController;

var ParamController = require('../../lib/controllers/param.controller');

/**
 * The Flight model instance
 * @type {flight:model~Flight}
 */
var Flight = require('./flight.model').model;

/**
 * FlightController constructor
 * @classdesc Controller that handles /api/flights route requests
 * for the flight api.
 * Uses the 'flightId' parameter and the 'flightParam' request property
 * to operate with the [main flight API Model]{@link flight:model~Flight} model.
 * @constructor
 * @inherits ParamController
 * @see flight:model~Flight
 */
function FlightController(router) {
	ParamController.call(this, Flight,  router);

	// modify select only properties
	// this.select = ['-__v'];

	// omit properties on update
	// this.omit = ['hashedPassword'];

	// property to return (maybe a virtual getter of the model)
	// this.defaultReturn = 'profile';
}

// define properties for the FlightController here
FlightController.prototype = {

	/**
	 * Set our own constructor property for instanceof checks
	 * @private
	 */
	constructor: FlightController

};

// inherit from ParamController
FlightController.prototype = Object.create(ParamController.prototype);

