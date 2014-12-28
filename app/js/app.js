var adsApp = angular.module('adsModule', ['ngRoute'])
	.config(function($routeProvider) {
			$routeProvider.when('/register', {
				templateUrl: 'templates/register.html',
				controller: 'HomeController'
			})
	});