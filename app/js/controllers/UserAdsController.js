adsApp.controller('UserAdsController', function ($scope, adsData, homeData, $http, $log, $location) {
    $http.defaults.headers.common['Authorization'] = "Bearer " + userAuthentication.getCurrentUser().access_token;
    //var responsePromise = adsData.getAll();
    var selStat;

    $scope.user = userAuthentication.getCurrentUser();

    $scope.status = {
        open: false
    };
   var info={
       startPage: 1,
        pageSize: 5,
       url: 'http://softuni-ads.azurewebsites.net/api/user/ads?',
       adStatus: selStat
};
    var doIt = function () {
        homeData.getResultsPage(info, function(resp) {
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
        console.log("Status" + selStat);
        doIt();
    };

    $scope.checkStatus = function(adStatus, status) {
        return adStatus === status;
    };

    //do tuk
    $scope.ad = {};

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
                console.log(data);
                $location.path('/user/ads');
            },
            function (error) {
                $log.error(error);
            });
    };

    $scope.deactivateAd =  function(adId){
       adsData.deactivate(adId)
           .$promise
           .then(function (data) {
               console.log(data);
               $location.path('/user/ads');

           },
           function (error) {
               $log.error(error);
           });
    };

    $scope.publishAgainAd =  function(adId){
        adsData.publishAgain(adId)
            .$promise
            .then(function (data) {
                console.log(data);
                $location.path('/user/ads');
            },
            function (error) {
                $log.error(error);
            });
    };

    doIt();
});