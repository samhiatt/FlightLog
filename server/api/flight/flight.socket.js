/**
 * Module for registering broadcast updates to clients when
 * the Flight model changes. Exports the
 * [register function]{@link flight:socket~registerFlightSockets}
 * to register the model schema events on the socket instance.
 * @module {function} flight:socket
 * @requires {@link flight:model}
 */
'use strict';

/**
 * The Flight model instance
 * @type {flight:model~Flight}
 */
var Flight = require('./flight.model').model;

// export the function to register all socket broadcasts
exports.register = registerFlightSockets;

/**
 * Register Flight model change events on the passed socket
 * @param {socket.io} socket - The socket object to register the Flight model events on
 */
function registerFlightSockets(socket) {
	Flight.schema.post('save', function (doc) {
		onSave(socket, doc);
	});

	Flight.schema.post('remove', function (doc) {
		onRemove(socket, doc);
	});
}

/**
 * Emit a Flight save event on a socket object: 'flight:save'
 * @param {socket.io} socket - The socket object to emit the Flight save event on
 * @param {MogooseDocument} doc - The saved document that triggered the event
 * @param {function} cb - The callback function
 */
function onSave(socket, doc, cb) {
	socket.emit('flight:save', doc);
}

/**
 * Emit a Flight remove event on a socket object: 'flight:remove'
 * @param {socket.io} socket - The socket object to emit the Flight remove event on
 * @param {MogooseDocument} doc - The removed document that triggered the event
 * @param {function} cb - The callback function
 */
function onRemove(socket, doc, cb) {
	socket.emit('flight:remove', doc);
}
