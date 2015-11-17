/**
 * An module for defining and initializing the Flight model.
 * Exporting the Flight model definition, schema and model instance.
 * @module {Object} flight:model
 * @property {Object} definition - The [definition object]{@link flight:model~FlightDefinition}
 * @property {MongooseSchema} schema - The [mongoose model schema]{@link flight:model~FlightSchema}
 * @property {MongooseModel} model - The [mongoose model]{@link flight:model~Flight}
 */
'use strict';

var mongoose = require('mongoose');
var requestContext = require('mongoose-request-context');
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;

/**
 * The Flight model definition
 * @type {Object}
 * @property {String} name - The name of this flight
 * @property {String} info - Details about this flight
 * @property {Boolean} active - Flag indicating this flight is active
 */
var FlightDefinition = {
	flightNumber: {type: Number},
	date:{type: String, required: true},
	startTime: {type: Date, required: true},
	endTime: {type: Date, required: true},
	siteId: {type: String},
	launchZone:{type: String},
	landingZone:{type: String},
	wing:{ type: String},
	notes:{type: String}
};

/**
 * The Flight model schema
 * @type {MongooseSchema}
 */
var FlightSchema = new mongoose.Schema(FlightDefinition);
FlightSchema.index({flightNumber:-1});
var Flight;

/**
 * Auto-increment flight number
 */
FlightSchema.pre('save',function(next){
	var doc = this;
	if (doc._id && doc.flightNumber){ // This must be an update
		next();
		return;
	}
	Flight.find({}).sort("-flightNumber").select('flightNumber').exec(function(err, res){
		if (err) next(err);
		else if (res.length==0) {
			doc.flightNumber = 1;
		} else {
			doc.flightNumber = res[0]._doc.flightNumber +1;
		}
		next();
	});
});

/**
 * Attach security related plugins
 */
FlightSchema.plugin(createdModifiedPlugin);

FlightSchema.plugin(requestContext, {
	propertyName: 'modifiedBy',
	contextPath: 'request:acl.user.name'
});

/**
 * Validations
 */
FlightSchema
	.path('flightNumber')
	.validate(validateUniqueFlightNumber, 'The specified flightNumber is already in use.');

/**
 *  The registered mongoose model instance of the Flight model
 *  @type {Flight}
 */
Flight = mongoose.model('Flight', FlightSchema);

module.exports = {

	/**
	 * The Flight model definition object
	 * @type {Object}
	 * @see flight:FlightModel~FlightDefinition
	 */
	definition: FlightDefinition,

	/**
	 * The Flight model schema
	 * @type {MongooseSchema}
	 * @see flight:model~FlightSchema
	 */
	schema: FlightSchema,

	/**
	 * The Flight model instance
	 * @type {flight:model~Flight}
	 */
	model: Flight

};

/**
 * Validate the uniqueness of the given name
 *
 * @api private
 * @param {String} value - The username to check for uniqueness
 * @param {Function} respond - The callback function
 */
function validateUniqueFlightNumber(value, respond) {
	// jshint validthis: true
	var self = this;

	// check for uniqueness of user flightNumber
	this.constructor.findOne({flightNumber: value}, function (err, flight) {
		if (err) {
			throw err;
		}

		if (flight) {
			// the searched flightNumber is the same as this
			return respond(self.id === flight.id);
		}

		respond(true);
	});
}
