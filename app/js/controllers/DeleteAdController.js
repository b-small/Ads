/**
 * Created by user on 1/2/2015.
 */
adsApp.controller('DelAdController', function($scope, $http, $routeParams, $location) {

    $http.defaults.headers.common['Authorization'] = "Bearer " + userAuthentication.getCurrentUser().access_token;

    var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/user/ads/"+$routeParams.adId, {});
    responsePromise.success(function(dataFromServer) {
        //console.log(dataFromServer);
        $scope.ad = dataFromServer;
    });
    responsePromise.error(function(data, status, headers, config) {
        alert("Submitting form failed!");
    });

    $scope.deleteAd = function() {
        var responsePromise = $http.delete("http://softuni-ads.azurewebsites.net/api/user/ads/"+$routeParams.adId, {});
        responsePromise.success(function(dataFromServer) {
            $location.path( '/user/ads' );
            console.log(dataFromServer);
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("Submitting form failed!");
        });

    }
});