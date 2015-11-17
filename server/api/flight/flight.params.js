/**
 * Module for initializing the flight api request parameters for /api/flights routes.
 * Export the {@link flight:Parameters~registerFlightParams}
 * function to register the api routes on the passed express router.
 * @module {function} flight:parameters
 * @requires {@link flight:model}
 */
'use strict';

// export the function to register all flight request params
module.exports = registerFlightParams;

/**
 * Attach request parameters to the given router.
 * @param router {express.Router} - The router to attach the parameters to
 */
function registerFlightParams(router) {
	// router.param('id', registerParamName);
	// add params below
}

/*
 * Register a parameter for /api/flights requests.
 * Add a  property to the current request.
 * @param {http.IncomingMessage} req - The request message object
 * @param {http.ServerResponse} res - The outgoing response object
 * @param next {function} - The next handler function to call when done
 * @param id {String} - The id parameter parsed from the current request
 * @see flight:model~Flight
 * @returns {function} This function sets a status of 400 for malformed MongoDB
 * id's and a status of 404 if no document has been found for the passed
 * parameter. Calls the passed next function when done.

	function registerParamName(req, res, next, id) {
		// attach the document to the request
		Model.findById(id, function (err, doc) {
			if (err) {
				return next(err);
			}

			if (!doc) {
				res.notFound();
				return next('route');
			}

			req.paramName = doc;
			return next();
		});
	}
 */

// add param functions below
