/**
 * Created by user on 1/5/2015.
 */
adsApp.controller('AdminAdsController', function ($scope, $http, $log, $location, $resource, $routeParams, $route, adminData, homeData, notifyService) {
    $http.defaults.headers.common['Authorization'] = "Bearer " + userAuthentication.getCurrentUser().access_token;

    $scope.user = userAuthentication.getCurrentUser();
    $scope.status = {
        open: false
    };

    var dataObject = {};
    var info = {
        startPage: 1,
        pageSize: 10,
        maxSize: 10,
        url: 'http://softuni-ads.azurewebsites.net/api/admin/ads?'
    };

    var doIt = function () {
        homeData.getResultsPage(info, function (resp) {
            $scope.data = resp;
            $scope.totalAds = $scope.data.numItems;
            $scope.itemsPerPage = 10;
            $scope.numPages = Math.ceil($scope.totalAds/$scope.itemsPerPage);

        });
    };

    $scope.pageChanged = function (newPage) {
        info.startPage = newPage;

        homeData.getResultsPage(info, function (resp) {
            $scope.data = resp;
        });
    };

    $scope.approveAd = function (adId) {
        var responsePromise = adminData.approveAd(adId);
        responsePromise.success(function (resp) {
            notifyService.showInfo("Ad approved successfully!");
            $route.reload();
        });
        responsePromise.error(function (resp) {
            notifyService.showError("Approving ad failed!");
        });
    };

    $scope.rejectAd = function (adId) {
        var responsePromise = adminData.rejectAd(adId);
        responsePromise.success(function (resp) {
            notifyService.showInfo("Ad rejected successfully!");
            $route.reload();
        });
        responsePromise.error(function (resp) {
            notifyService.showError("Rejecting ad failed!");
        });
    };


    if ($routeParams.adId !== undefined) {
        var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/admin/ads/" + $routeParams.adId, {});
        responsePromise.success(function (dataFromServer) {
            $scope.ad = dataFromServer;
        });
        responsePromise.error(function (data, status, headers, config) {
            notifyService.showError("Loading ad failed!");
        });
    }


    $scope.deleteAd = function () {
        var responsePromise = adminData.deleteAd($routeParams.adId);
        responsePromise.success(function (dataFromServer) {
            $location.path('admin/home');
            notifyService.showInfo("Ad deleted successfully!");
        });
        responsePromise.error(function (data, status, headers, config) {
            notifyService.showError("Deleting ad failed!");
        });
    };


    $scope.fileSelected = function (fileInputField) {

        var file = fileInputField.files[0];
        if (file.type.match(/image\/.*/)) {
            var reader = new FileReader();
            reader.onload = function () {
                dataObject.imageDataUrl = reader.result;
                dataObject.changeimage = true;
                $(".image-box").html("<img src='" + reader.result + "'>");
            };
            reader.readAsDataURL(file);
        } else {
            $(".image-box").html("<p>File type not supported!</p>");
        }
    };


    $scope.editAd = function () {
        var responsePromise = adminData.editAd($routeParams.adId, $scope.ad);
        responsePromise.success(function (dataFromServer) {
            $location.path('admin/home');
            notifyService.showInfo("Edited ad successfully!");
        });
        responsePromise.error(function (data, status, headers, config) {
            notifyService.showError("Editing ad failed!");
        });

    };


    $scope.setSelectedCategory = function (value) {
        if ($scope.selectedCategory === value) {
            $scope.selectedCategory = undefined;

        } else {
            $scope.selectedCategory = value;
        }
        info.categoryId = $scope.selectedCategory;
        doIt();
    };


    $scope.setSelectedTown = function (town) {
        if ($scope.selectedTown === town) {
            $scope.selectedTown = undefined;
        } else {
            $scope.selectedTown = town;
        }
        info.townId = $scope.selectedTown;
        doIt();
    };


    $scope.setSelectedStatus = function (value) {
        if ($scope.selectedStatus === value) {
            $scope.selectedStatus = undefined;

        } else {
            $scope.selectedStatus = value;
        }
        info.adStatus = $scope.selectedStatus;
        doIt();
    };
});