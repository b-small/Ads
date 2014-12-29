var adsApp = angular.module('adsModule', ['ngRoute'])
	.config(function($routeProvider) {
			$routeProvider.when('/register', {
				templateUrl: 'templates/register.html',
				controller: 'HomeController'
			});
		$routeProvider.when('/login', {
					templateUrl: 'templates/login.html'
				});
		$routeProvider.when('/ads', {
					templateUrl: 'templates/listAds.html'
				});
		$routeProvider.otherwise({redirectTo: '/ads'});
	});