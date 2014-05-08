'use strict';

/* Controllers */
var wikiAppControllers = angular.module('wikiAppControllers', ['ngCookies']);

wikiAppControllers.controller('wikiLoginController', function($scope, $cookies, $rootScope, apiRequest, sharedProperties) {

	$scope.validKey = false;
	$scope.validToken = false;

	// Check cookies for a trello key.
	if ($cookies.trelloKey) {
		$scope.key = $cookies.trelloKey;
		$scope.validKey = true;
	}

	// Check cookies for a trello token.
	if ($cookies.trelloToken) {
		$scope.token = $cookies.trelloToken;
		$scope.validToken = true;
		sharedProperties.setToken($cookies.trelloToken);
		sharedProperties.setKey($cookies.trelloKey);
	}

	// Validate a Key
	$scope.generateKey = function(key) {
		var checkKey = apiRequest.validateKey(key);
		checkKey.then(function(value) {
			$scope.key = key;
			$cookies.trelloKey = key;
			sharedProperties.setKey(key);
			$scope.validKey = true;

		}, function(reason) {
			alert('This key is invalid: ' + reason);
		});
	}

	// Validate a Token
	$scope.generateToken = function(token) {

		var checkToken = apiRequest.validateToken($scope.key, token);
		checkToken.then(function(value) {
			$scope.token = token;
			$cookies.trelloToken = token;

			$scope.validToken = true;
			sharedProperties.setToken(token);

		}, function(reason) {
			alert('This token is invalid: ' + reason);
		});
	}

});

wikiAppControllers.controller('wikiListController', function($scope, apiRequest, $rootScope, sharedProperties, $sce) {

	$scope.trelloToken = sharedProperties.getToken();
	$scope.trelloKey = sharedProperties.getKey();
	$scope.boardId = null;
	$scope.html = true;

	// Function to get all boards with a key and token.
	$scope.getBoards = function(key, token) {
		var getBoards = apiRequest.getBoards(key, token);
		getBoards.then(function(boards) {
			$scope.boards = boards;
		}, function(reason) {
			alert('This token is invalid.');
		});
	};

	// If the token is already assigned, get the boards.
	if (typeof($scope.trelloToken) != undefined && typeof($scope.trelloKey) != 'undefined') {
		$scope.getBoards($scope.trelloKey, $scope.trelloToken);
	}

	// Listen for a new token.
	$scope.$on('newToken', function(newValue, oldValue) {
		if (typeof(sharedProperties.getToken()) != 'undefined') {
			$scope.trelloToken = sharedProperties.getToken();
			$scope.trelloKey = sharedProperties.getKey();
			$scope.getBoards(sharedProperties.getKey(), sharedProperties.getToken());
		}
	});

	// Get the lists of a paticular board.
	$scope.getBoardLists = function(boardId) {
		var wikiBoard = apiRequest.getBoardLists(boardId, $scope.trelloKey, $scope.trelloToken);
		wikiBoard.then(function(lists) {
			$scope.lists = lists;
		});
	}

	// Generate the list's cards.
	$scope.generateWiki = function(boardId, trelloList) {
		// Get the full detail of the list.
		var wikiList = apiRequest.getList(trelloList, $scope.trelloKey, $scope.trelloToken);
		wikiList.then(function(cards) {
			$scope.cards = cards;
		});
	}

	// Set which list to get.
	$scope.setList = function(listId) {
		$scope.trelloList = listId;
	}

	// Change the html version.
	$scope.changeVersion = function() {
		$scope.html = ($scope.html === false);
	}

});

wikiAppControllers.controller('cardController', function($scope, apiRequest) {

	// Get a card with it's id.
	$scope.getCard = function(cardId) {
		var fullCard = apiRequest.getCard(cardId, $scope.trelloKey, $scope.trelloToken);
		fullCard.then(function(card) {
			$scope.card = card;
		});
	}
	$scope.getCard($scope.cardid);

});

