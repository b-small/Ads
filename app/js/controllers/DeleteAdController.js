/**
 * Created by user on 1/2/2015.
 */
adsApp.controller('DelAdController', function ($scope, $http, $routeParams, $location, adsData) {

    $http.defaults.headers.common['Authorization'] = "Bearer " + userAuthentication.getCurrentUser().access_token;

    $scope.status = {
        open: false
    };
    $scope.ad = adsData.getById($routeParams.adId);

    $scope.deleteAd = function () {
        adsData.delete($routeParams.adId)
        .$promise
            .then(function (data) {
                console.log(data);
                $location.path('/user/ads');
            },
            function (error) {
                $log.error(error);
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

        dataObject.title = $scope.ad.title;
        dataObject.text = $scope.ad.text;
        dataObject.categoryId = $scope.ad.categoryId;
        dataObject.townId = $scope.ad.townId;
        dataObject.categoryName = $scope.ad.categoryName;
        dataObject.townName = $scope.ad.townName;
        // imageDataUrl: $scope.ad.imageDataUrl

        adsData.edit($routeParams.adId, dataObject)
            .$promise
            .then(function (data) {
                console.log(data);
                $location.path('/user/ads');
            },
            function (error) {
                $log.error(error);
            });
    };
});