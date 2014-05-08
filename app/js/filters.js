'use strict';

/* Filters */

angular.module('wikiAppFilters', []).
  filter('interpolate', ['version', function(version) {
//    return function(text) {
//      return String(text).replace(/\%VERSION\%/mg, version);
//    };
  }]);
