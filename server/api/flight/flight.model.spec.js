/* jshint unused:false */
'use strict';

var should = require('should');

var flight = require('./flight.model');
var flightDefinition = flight.definition;
var flightSchema= flight.schema;
var Flight = flight.model;

var flightData = [
	{
		name: 'Dog',
		info: 'Hello, this is dog.',
		active: true
	}, {
		name: 'Bugs Bunny',
		info: 'Famous Bunny.',
		active: true
	}, {
		name: 'Nyan Cat',
		info: 'No comment.',
		active: false
	}
];

// Clear all flights
function cleanup(done) {
	Flight.remove().exec().then(function () { done();	});
}

describe('Flight Model', function () {

	// Clear flights before testing
	before(cleanup);

	// Clear flights after testing
	after(cleanup);

// Check test conditions for flight tests
	it('should start with no flights', function (done) {
		Flight.find({}, function (err, flights) {
			flights.should.have.length(0);
			done(err);
		});
	});

	describe('basic crud operations', function () {

		var flightModel = new Flight(flightData[0]);

		// Clear flights after running this suite
		after(cleanup);

		it('should insert a new flight', function (done) {
			flightModel.save(function (err, flight) {
				flight.should.have.properties(flightModel);
				done(err);
			});
		});

		it('should insert a list of flights', function (done) {
			Flight.create(flightData, function (err, flight) {
				// slice err argument
				Array.prototype.slice.call(arguments, 1)
					.should.have.lengthOf(flightData.length);
				done(err);
			});
		});


		it('should find a flight by _id property', function (done) {
			Flight.findById(flightModel._id, function (err, flight) {
				flight.should.have.properties(flightData[0]);
				done(err);
			});
		});

		it('should update a flight', function (done) {
			flightModel.name = 'foo';
			flightModel.save(function (err) { done(err);	});
		});

		it('should remove a flight', function (done) {
			flightModel.remove(function (err) { done(err); });
		});
	}); // crud
});
