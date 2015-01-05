/**
 * Created by user on 12/28/2014.
 */
adsApp.controller('HomeController', function ($scope, homeData) {

    var selCat;
    var selTown;
    $scope.user = userAuthentication.getCurrentUser();

    $scope.status = {
        open: false
    };

    var doIt = function () {
        homeData.getResultsPage(1, selTown, selCat, function (resp) {
            $scope.data = resp;
            $scope.totalAds = $scope.data.numItems;
            console.log($scope.totalAds);
            $scope.itemsPerPage = 5;
        });
    };

    $scope.pageChanged = function (newPage) {
        homeData.getResultsPage(newPage, $scope.selectedTown, $scope.selectedCategory, function (resp) {
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
        selCat = $scope.selectedCategory;
        doIt();
    };

    $scope.setSelectedTown = function (town) {
        if ($scope.selectedTown === town) {
            $scope.selectedTown = undefined;
        } else {
            $scope.selectedTown = town;
        }
        selTown = $scope.selectedTown;
        doIt();
    };

    $scope.byCategory = function (entry) {
        return entry.categoryId === $scope.selectedCategory || $scope.selectedCategory === undefined;
    };

    $scope.byTown = function (entry) {
        return entry.townId === $scope.selectedTown || $scope.selectedTown === undefined;
    };

});