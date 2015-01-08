/**
 * Created by user on 1/2/2015.
 */
adsApp.controller('DelAdController', function ($scope, $http, $routeParams, $location, $route, adsData, notifyService) {
    $http.defaults.headers.common['Authorization'] = "Bearer " + userAuthentication.getCurrentUser().access_token;

    $scope.user = userAuthentication.getCurrentUser();
    $scope.ad = adsData.getById($routeParams.adId);
    var dataObject = {};

    $scope.status = {
        open: false
    };


    $scope.deleteAd = function () {
        adsData.delete($routeParams.adId)
            .$promise
            .then(function (data) {
                console.log(data);
                $location.path('/user/ads');
                notifyService.showInfo("Deleted ad successfully!");

            },
            function (error) {
                notifyService.showError("Deleting ad failed!");
            });
    };


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

        dataObject.title = $scope.ad.title;
        dataObject.text = $scope.ad.text;
        dataObject.categoryId = $scope.ad.categoryId;
        dataObject.townId = $scope.ad.townId;
        dataObject.categoryName = $scope.ad.categoryName;
        dataObject.townName = $scope.ad.townName;

        adsData.edit($routeParams.adId, dataObject)
            .$promise
            .then(function (data) {
                $location.path('/user/ads');
                notifyService.showInfo("Edited ad successfully!");
            },
            function (error) {
                $log.error(error);
                notifyService.showError("Editing ad failed!");
            });
    };

    $scope.deleteImage = function(){
        $scope.ad.imageDataUrl = undefined;

    };
});