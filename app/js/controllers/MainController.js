/**
 * Created by user on 12/28/2014.
 */
adsApp.controller('HomeController', function ($scope, homeData) {
    homeData.getAllAds(function (resp) {
        $scope.data = resp;
    });

    homeData.getAllTowns(function (resp) {
        $scope.towns = resp;
    });

    homeData.getAllCategories(function(resp) {
       $scope.categories = resp;
    });
})