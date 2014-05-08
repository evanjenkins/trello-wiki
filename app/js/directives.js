'use strict';

/* Directives */


var wikiAppDirectives = angular.module('wikiAppDirectives', []);

wikiAppDirectives.directive('cardDetail', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		link: function(scope, element, attrs) {
//      var domElement = element[0];
//
//      domElement.focus();
//      domElement.value = $compile()
    },
		templateUrl: 'partials/card-detail.html',
		controller: 'cardController'
	}
});

wikiAppDirectives.directive('cardDetailGithub', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			cardid: '='
		},
		link: function() {},
		templateUrl: 'partials/card-detail-github.html',
		controller: 'cardController'
	}
});
