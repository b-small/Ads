var adsApp = angular.module('adsModule', ['ngResource', 'ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'templates/register.html',
            controller: 'RegisterController'
        });
        $routeProvider.when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'LoginController'

        });
        $routeProvider.when('/ads', {
            templateUrl: 'templates/listAds.html'
        });

        $routeProvider.when('/user/home', {
            templateUrl: 'templates/user/home.html'
        });

        //TODO
        $routeProvider.when('/user/ads/publish', {
            templateUrl: 'templates/user/publishAd.html',
            controller: 'NewAdController'
        });

        $routeProvider.when('/user/ads', {
            templateUrl: 'templates/user/myAds.html',
            controller: 'UserAdsController'
        });


        $routeProvider.otherwise({redirectTo: '/ads'});
    });