var adsApp = angular.module('adsModule', ['ngRoute'])
	.config(function($routeProvider) {
			$routeProvider.when('/register', {
				templateUrl: 'templates/register.html',
				controller: 'HomeController'
			})
				.when('/login', {
					templateUrl: 'templates/login.html'
				})
				.when('/ads', {
					templateUrl: 'templates/listAds.html'
				})
	});