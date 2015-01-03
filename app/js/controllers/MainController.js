/**
 * Created by user on 12/28/2014.
 */
adsApp.controller('HomeController', function ($scope, homeData) {

        homeData.getResultsPage(1, function(resp) {
            $scope.data = resp;
            $scope.totalAds = $scope.data.numItems;
            $scope.itemsPerPage = 5;
        });


    $scope.pageChanged = function(newPage) {
        homeData.getResultsPage(newPage, function(resp) {
            $scope.data = resp;
        });
    };

    homeData.getAllTowns(function (resp) {
        $scope.towns = resp;
    });

    homeData.getAllCategories(function(resp) {
       $scope.categories = resp;
    });

    $scope.setSelectedCategory = function (value) {
        if ($scope.selectedCategory === value) {
            $scope.selectedCategory = undefined;
        } else {
            $scope.selectedCategory = value;
        }
    };


    $scope.byCategory = function(entry){
        return entry.categoryId === $scope.selectedCategory || $scope.selectedCategory === undefined;
    };

});