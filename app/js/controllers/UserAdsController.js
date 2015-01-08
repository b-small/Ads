adsApp.controller('UserAdsController', function ($scope, adsData, homeData, $http, $log, $location, $route, notifyService) {
    $http.defaults.headers.common['Authorization'] = "Bearer " + userAuthentication.getCurrentUser().access_token;

    $scope.user = userAuthentication.getCurrentUser();

    $scope.status = {
        open: false
    };

    $scope.ad = {};

    var info = {
        startPage: 1,
        pageSize: 5,
        url: 'http://softuni-ads.azurewebsites.net/api/user/ads?'
    };

    var doIt = function () {
        homeData.getResultsPage(info, function (resp) {
                $scope.data = resp;
                $scope.totalAds = $scope.data.numItems;
                $scope.itemsPerPage = 5;
            }
        );
    };

    $scope.pageChanged = function (newPage) {
        info.startPage = newPage;
        homeData.getResultsPage(info, function (resp) {
            $scope.data = resp;
        });
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

    $scope.checkStatus = function (adStatus, status) {
        return adStatus === status;
    };

    $scope.fileSelected = function (fileInputField) {
        console.log(fileInputField.files[0]);
        //delete $scope.adData.imageDataUrl;
        var file = fileInputField.files[0];
        if (file.type.match(/image\/.*/)) {
            var reader = new FileReader();
            reader.onload = function () {
                $scope.ad.imageDataUrl = reader.result;
                $(".image-box").html("<img src='" + reader.result + "'>");
            };
            reader.readAsDataURL(file);
        } else {
            $(".image-box").html("<p>File type not supported!</p>");
        }
    };


    $scope.deleteImage = function(){
        $scope.ad.imageDataUrl = undefined;
        $route.reload();
    };


    $scope.addAd = function () {
        var dataObject = {
            title: $scope.ad.title,
            text: $scope.ad.text,
            categoryId: $scope.ad.categoryId,
            townId: $scope.ad.townId,
            categoryName: $scope.ad.categoryName,
            townName: $scope.ad.townName,
            imageDataUrl: $scope.ad.imageDataUrl

        };

        adsData.create(dataObject)
            .$promise
            .then(function (data) {
                $location.path('/user/ads');
                notifyService.showInfo("Ad published successfully!");

            },
            function (error) {
                $log.error(error);
                notifyService.showError("Publishing ad failed!");
            });
    };

    $scope.deactivateAd = function (adId) {
        adsData.deactivate(adId)
            .$promise
            .then(function (data) {
                $location.path('/user/ads');
                notifyService.showInfo("Ad deactivated successfully!");
            },
            function (error) {
                $log.error(error);
                notifyService.showError("Deactivating ad failed!");
            });
    };

    $scope.publishAgainAd = function (adId) {
        adsData.publishAgain(adId)
            .$promise
            .then(function (data) {
                $location.path('/user/ads');
                notifyService.showInfo("Published ad again successfully!");
            },
            function (error) {
                $log.error(error);
                notifyService.showError("Publishing ad again failed!");
            });
    };
    doIt();
});