/**
 * Created by user on 12/28/2014.
 */
adsApp.controller('HomeController', function ($scope, homeData) {
    $scope.user = userAuthentication.getCurrentUser();

    $scope.status = {
        open: false
    };

    var info = {
        startPage: 1,
        pageSize: 5,
        url: 'http://softuni-ads.azurewebsites.net/api/ads?'
    };

    var doIt = function () {
        homeData.getResultsPage(info, function (resp) {
            $scope.data = resp;
            $scope.totalAds = $scope.data.numItems;
            $scope.itemsPerPage = 5;
            $scope.numPages = Math.ceil($scope.totalAds/$scope.itemsPerPage);

        });
    };

    $scope.pageChanged = function (newPage) {
        info.startPage = newPage;
        homeData.getResultsPage(info, function (resp) {
            $scope.data = resp;
        });
    };

    homeData.getAllTowns(function (resp) {
        $scope.towns = resp;
    });

    homeData.getAllCategories(function (resp) {
        $scope.categories = resp;
    });

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
});