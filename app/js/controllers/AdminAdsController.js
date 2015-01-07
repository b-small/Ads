/**
 * Created by user on 1/5/2015.
 */
adsApp.controller('AdminAdsController', function ($scope, $http, $log, $location, $resource, $routeParams, $route, adminData, homeData) {
    $http.defaults.headers.common['Authorization'] = "Bearer " + userAuthentication.getCurrentUser().access_token;
    var selStat;

    $scope.user = userAuthentication.getCurrentUser();

    $scope.status = {
        open: false
    };
    var info={
        startPage: 1,
        pageSize: 5,
        url: 'http://softuni-ads.azurewebsites.net/api/admin/ads?'
    };

    var doIt = function () {
        homeData.getResultsPage(info, function (resp) {
            $scope.data = resp;
            $scope.totalAds = $scope.data.numItems;
            $scope.itemsPerPage = 5;
        });
    };

    $scope.pageChanged = function (newPage) {
        info.startPage= newPage;
        homeData.getResultsPage(info, function (resp) {
            $scope.data = resp;
        });
    };

    $scope.approveAd = function (adId) {
        var responsePromise = adminData.approveAd(adId);
        responsePromise.success(function (resp) {
            console.log(resp);
            $route.reload();
        });
        responsePromise.error(function (resp) {
            console.log('Loading ads failed!');
        });
    };

    $scope.rejectAd = function (adId) {
        var responsePromise = adminData.rejectAd(adId);
        responsePromise.success(function (resp) {
            console.log(resp);
            $route.reload();
        });
        responsePromise.error(function (resp) {
            console.log('Loading ads failed!');
        });
    };


    if ($routeParams.adId !== undefined) {
        var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/admin/ads/" + $routeParams.adId, {});
        responsePromise.success(function (dataFromServer) {
            $scope.ad = dataFromServer;
            console.log("Ad: " + $scope.ad);
        });
        responsePromise.error(function (data, status, headers, config) {
            alert("getting ad failed!");
        });
    }

    $scope.deleteAd = function () {
        var responsePromise = adminData.deleteAd($routeParams.adId);
        responsePromise.success(function (dataFromServer) {
            $location.path('admin/home');
        });
        responsePromise.error(function (data, status, headers, config) {
            alert("deleting ad failed!");
        });
    };

    var dataObject = {};

    $scope.fileSelected = function (fileInputField) {
        console.log(fileInputField.files[0]);

        //delete $scope.adData.imageDataUrl;
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
        });
        responsePromise.error(function (data, status, headers, config) {
            alert("editing ad failed!");
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
        console.log("Status" + selStat);
        doIt();
    };
});