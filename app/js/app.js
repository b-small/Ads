var adsApp = angular.module('adsModule', ['ngResource', 'ngRoute', 'ui.bootstrap'])
    .config(function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'templates/register.html',
            controller: 'LoginRegisterController'
        });

        $routeProvider.when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'LoginRegisterController'
        });

        $routeProvider.when('/ads', {
            templateUrl: 'templates/listAds.html',
            controller: 'HomeController'
        });

        $routeProvider.when('/user/home', {
            templateUrl: 'templates/user/home.html',
            controller: 'HomeController',
            resolve: {loginRequired: loginRequired}

        });

        $routeProvider.when('/user/ads/publish', {
            templateUrl: 'templates/user/publishAd.html',
            controller: 'UserAdsController',
         resolve: {loginRequired: loginRequired}

        });

        $routeProvider.when('/user/ads', {
            templateUrl: 'templates/user/myAds.html',
            controller: 'UserAdsController',
            resolve: {loginRequired: loginRequired}

        });

        $routeProvider.when('/delete/:adId', {
            templateUrl: 'templates/user/deleteAd.html',
            controller: 'DelAdController',
           resolve: {loginRequired: loginRequired}
        });

        $routeProvider.when('/edit/:adId', {
            templateUrl: 'templates/user/editAd.html',
            controller: 'DelAdController',
            resolve: {loginRequired: loginRequired}
        });

        $routeProvider.when('/user/profile', {
            templateUrl: 'templates/user/editUserProfile.html',
            controller: 'EditUserProfileController',
            resolve: {loginRequired: loginRequired}
        });

        $routeProvider.otherwise({redirectTo: '/ads'});

    });

var loginRequired = function ($location, $q) {
    var deferred = $q.defer();

    if (!userAuthentication.getCurrentUser()) {
        deferred.reject();
        $location.path('/login');
    } else if (userAuthentication.getCurrentUser().isAdmin) {
        deferred.reject();
        $location.path('/admin/home');
    } else {
        deferred.resolve()
    }

    return deferred.promise;
};


var adminRequired = function ($location, $q) {
    var deferred = $q.defer();

    if (userSession.getCurrentUser() && userSession.getCurrentUser().isAdmin) {
        deferred.resolve();
    } else {
        deferred.reject();
        if (!userAuthentication.getCurrentUser())
            $location.path('/login');
        else
            $location.path('/user');
    }

    return deferred.promise;
};