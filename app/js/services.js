'use strict';

/* Services */

var wikiAppServices = angular.module('wikiAppServices', []);

// Demonstrate how to register services
// In this case it is a simple value service.
wikiAppServices.factory('apiRequest', function($http, $q, $rootScope) {
	var api = {};

	// This is all jacked right now (I am talking to you Bryan). Just making a case.
	// Api request to get all lists on a board.
	api.getBoardLists = function(boardId, key, token) {
		var deferred = $q.defer(),
        url = 'https://api.trello.com/1/board/'+ boardId +'/lists?key=' + key + '&token=' + token;

		$http({method: 'GET', url: url}).
			success(function (data, status, headers, config) {
				deferred.resolve(data);
			}).
			error(function (data, status, headers, config) {
				deferred.reject(status);
			});
		return deferred.promise;
	};

	// Api request for a board.
	api.getBoards = function(key, token) {
		var deferred = $q.defer(),
			url = 'https://trello.com/1/members/my/boards?key=' + key + '&token=' + token;

		$http({method: 'GET', url: url}).
			success(function (data, status, headers, config) {
				deferred.resolve(data);
			}).
			error(function (data, status, headers, config) {
				deferred.reject(status);
			});
		return deferred.promise;
	};

	// Api request for a list.
	api.getList = function(listId, key, token) {
		var deferred = $q.defer(),
				url = 'https://api.trello.com/1/lists/'+ listId +'/cards?key=' + key + '&token=' + token;

		$http({method: 'GET', url: url}).
			success(function (data, status, headers, config) {
				deferred.resolve(data);
			}).
			error(function (data, status, headers, config) {
				deferred.reject(status);
			});
		return deferred.promise;
	};

	// Api request for a card.
	api.getCard = function(cardId, key, token) {
		var deferred = $q.defer(),
				url = 'https://api.trello.com/1/cards/'+ cardId + '?key=' + key + '&token=' + token;

		$http({method: 'GET', url: url}).
			success(function (data, status, headers, config) {
				deferred.resolve(data);
			}).
			error(function (data, status, headers, config) {
				deferred.reject(status);
			});
		return deferred.promise;
	};

	// Validate the application key
	api.validateKey = function(key) {
		var deferred = $q.defer(),
				url = 'https://api.trello.com/1/board/4d5ea62fd76aa1136000000c?key=' + key;

		$http({method: 'GET', url: url}).
			success(function (data, status, headers, config) {
				deferred.resolve(data);
			}).
			error(function (data, status, headers, config) {
				deferred.reject(status);
			});
		return deferred.promise;
	};

	// Validate the application token
	api.validateToken = function(key, token) {
		var deferred = $q.defer(),
				url = 'https://trello.com/1/members/me?key=' + key + '&token=' + token;

		$http({method: 'GET', url: url}).
			success(function (data, status, headers, config) {
				deferred.resolve(data);
			}).
			error(function (data, status, headers, config) {
				deferred.reject(status);
			});
		return deferred.promise;
	};

	return api;
});
/**
 * Shared properties.
 * 	Use to share properties accross controllers.
 */
wikiAppServices.factory('sharedProperties', function($rootScope) {
	var validToken,
			validKey,
			fullName,
			api = {};

	api.getToken = function() {
		return validToken;
	};
	api.setToken = function(value) {
		validToken = value;
		$rootScope.$broadcast("newToken");
	};
	api.getKey = function() {
		return validKey;
	};
	api.setKey = function(value) {
		validKey = value;
	};
	api.getFullName = function() {
		return fullName;
	};
	api.setFullName = function(value) {
		fullName = value;
		$rootScope.$broadcast("newName");
	};

	return api;
});
