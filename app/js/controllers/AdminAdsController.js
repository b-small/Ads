/**
 * Created by user on 1/5/2015.
 */
adsApp.controller('AdminAdsController', function ($scope, $http, $log, $location, $resource, adminData) {
    $http.defaults.headers.common['Authorization'] = "Bearer " + userAuthentication.getCurrentUser().access_token;
    var responsePromise = adminData.getAllAds();
    var selStat;

    $scope.user = userAuthentication.getCurrentUser();

    $scope.status = {
        open: false
    };

    responsePromise.success(function (resp) {
        $scope.data = resp;
        $scope.totalAds = $scope.data.numItems;
        $scope.itemsPerPage = 10;
        console.log(JSON.stringify($scope.data.ads));
    });

    responsePromise.error(function (resp) {
        console.log('Loading ads failed!');
    });

    $scope.approveAd = function(adId) {
        var responsePromise = adminData.approveAd(adId);
        responsePromise.success(function (resp) {
            console.log(resp);
            $location.path('/admin/home');
        });
        responsePromise.error(function (resp) {
            console.log('Loading ads failed!');
        });
    };

    $scope.rejectAd = function(adId) {
        var responsePromise = adminData.rejectAd(adId);
        responsePromise.success(function (resp) {
            console.log(resp);
            $location.path('/admin/home');
        });
        responsePromise.error(function (resp) {
            console.log('Loading ads failed!');
        });
    };

    $scope.deleteAd = function(adId) {
        var responsePromise = adminData.deleteAd(adId);
        responsePromise.success(function (resp) {
            console.log(resp);
            $location.path('/admin/home');
        });
        responsePromise.error(function (resp) {
            console.log('Loading ads failed!');
        });
    }
});