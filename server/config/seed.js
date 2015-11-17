/*
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';

var User = require('../api/user/user.model').model;
var Flight = require('../api/flight/flight.model').model;

/*
// Insert some data needed to bootstrap or init the application

if ('production' === env) {
	// Insert some data needed to init the production instance only, update a version info ...
}
*/

/*
 * Insert dummy data to test the application
 */
exports.users = [{
	provider: 'local',
	name: 'Test User',
	password: 'password',
	active: true
}, {
	provider: 'local',
	role: 'admin',
	name: 'Admin',
	password: 'password',
	active: true
}, {
	provider: 'local',
	role: 'root',
	name: 'Root',
	password: 'password',
	active: true
}];

if ('development' === env) {
	console.log('Populating test and development data ...');

	Flight.find({}).remove(function(err){
		if (err) throw err;
		Flight.create({
			date:'2015-11-16',
			startTime: new Date(new Date()-1000*60*20),
			endTime: new Date(),
			siteId: "TheDumps",
			launchZone:"Lemmings",
			landingZone:"Beach",
			wing:"Gin Atlas XS",
			notes:"Good flight. Nice landing. And here is a very long description of the flight, where I launched from Lemmings and landed at the Beach. I want to see how this text will wrap."
		},function(err,resp){
			if (err) console.error(err);
			else console.log("Added a flight");

			Flight.create({
				date:'2015-11-16',
				startTime: new Date(new Date()-1000*60*20),
				endTime: new Date(),
				siteId: "TheDumps",
				launchZone:"Lemmings",
				landingZone:"Beach",
				wing:"Gin Atlas XS",
				notes:"Good flight. Nice landing. And here is a very long description of the flight, where I launched from Lemmings and landed at the Beach. I want to see how this text will wrap."
			},function(err,resp){
				if (err) console.error(err);
				else console.log("Added a flight");
			});
		});
	});
	
	User.find({}).remove(function () {
		User.create(exports.users, function (err) {
			if (err) {
				console.error('Error while populating users: %s', err);
			} else {
				console.log('finished populating users');
			}
		});
	});
}
