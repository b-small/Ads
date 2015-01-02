/**
 * Created by user on 12/28/2014.
 */
adsApp.controller('HomeController', function ($scope, homeData) {

    homeData.getAllAds(function (resp) {

        $scope.data = resp;

        doPagination($scope.data);
    });

   var doPagination = (function(resp) {
            $scope.data = resp;
        //pagination
        $scope.totalItems = $scope.data.numItems;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 5;

        $scope.pageCount = function () {
            return Math.ceil($scope.totalItems / $scope.itemsPerPage);
        };


        $scope.$watch( 'currentPage + itemsPerPage', function() {
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                end = begin + $scope.itemsPerPage;

            $scope.filteredAds = $scope.data.ads.slice(begin, end);

        });
    });

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