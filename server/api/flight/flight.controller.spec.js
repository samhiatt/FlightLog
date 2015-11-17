/* jshint unused:false */
'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var flightModel = require('./flight.model');

// Clear all flights
function cleanup(done) {
	flightModel.model.remove().exec().then(function () { done();	});
}

describe('/api/flights', function () {

	var flight;

	// reset flight before each test
	beforeEach(function () {
		flight = {
			name: 'Dog',
			info: 'Hello, this is dog.',
			active: true
		};
	});

	// Clear flights before each test
	beforeEach(cleanup);

	// Clear flights after each test
	afterEach(cleanup);

	describe('GET', function () {

		it('should respond with JSON array', function (done) {
			request(app)
				.get('/api/flights')
				.set('Accept', 'application/json')
				.expect(200)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					res.body.should.be.instanceof(Array);
					done();
				});
		});

		it('should respond with an error for a malformed flight id parameter', function (done) {
			request(app)
				.get('/api/flights/malformedid')
				.set('Accept', 'application/json')
				.expect(400)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should respond with an not found error for a not existing flight id', function (done) {
			request(app)
				.get('/api/flights/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should return a flight for its id', function (done) {
			flightModel.model(flight).save(function (err, doc) {
				request(app)
					.get('/api/flights/' + doc._id)
					.set('Accept', 'application/json')
					.expect(200)
					.expect('Content-Type', /json/)
					.end(function (err, res) {
						if (err) {
							return done(err);
						}
						res.body.should.be.an.Object.and.have.properties(flight);
						res.body._id.should.exist;
						done();
					});
			});
		});

	});

	describe('POST', function () {

		it('should create a new flight and respond with 201 and the created flight', function (done) {
			request(app)
				.post('/api/flights')
				.set('Accept', 'application/json')
				.send(flight)
				.expect(201)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					res.body.should.be.an.Object.and.have.properties(flight);
					res.body._id.should.exist;
					done();
				});
		});

	});

	describe('PUT', function () {

		it('should return an error if attempting a put without an id', function (done) {
			request(app)
				.put('/api/flights')
				.set('Accept', 'application/json')
				.send(flight)
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing flight id', function (done) {
			request(app)
				.put('/api/flights/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should update a flight and respond with the updated flight', function (done) {
			request(app)
				.post('/api/flights')
				.set('Accept', 'application/json')
				.send(flight)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					flight.name = 'Cat';
					// check if id is stripped on update
					flight._id = 'malformed id string';
					request(app)
						.put('/api/flights/' + res.body._id)
						.set('Accept', 'application/json')
						.send(flight)
						.expect(200)
						.expect('Content-Type', /json/)
						.end(function (err, res) {
							if (err) {
								return done(err);
							}
							res.body.should.be.an.Object.and.have.property('name', flight.name);
							done();
						});
				});
		});

	});

	describe('DELETE', function () {

		it('should return an error if attempting a delete without an id', function (done) {
			request(app)
				.delete('/api/flights')
				.set('Accept', 'application/json')
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing flight id', function (done) {
			request(app)
				.delete('/api/flights/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should delete a flight and respond with 204', function (done) {
			request(app)
				.post('/api/flights')
				.set('Accept', 'application/json')
				.send(flight)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					request(app)
						.delete('/api/flights/' + res.body._id)
						.set('Accept', 'application/json')
						.expect(204)
						.end(done);
				});
		});
	});
});
