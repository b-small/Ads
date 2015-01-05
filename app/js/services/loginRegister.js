/**
 * Created by user on 1/5/2015.
 */
adsApp.factory('loginRegister', function ($http, $location, $log, $resource) {

    function login(user) {
        return $http.post("http://softuni-ads.azurewebsites.net/api/user/login", user);
    }

    function register(user) {
        return $http.post("http://softuni-ads.azurewebsites.net/api/user/register", user);
    }

    return {
        login: login,
        register: register
    }
});