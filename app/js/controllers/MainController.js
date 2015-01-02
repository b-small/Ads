/**
 * Created by user on 12/28/2014.
 */
adsApp.controller('HomeController', function ($scope, homeData) {
    homeData.getAllAds(function (resp) {
        $scope.data = resp;

        //pagination
        $scope.totalItems = $scope.data.ads.length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 5;

        $scope.pageCount = function () {
            return Math.ceil($scope.data.ads.length / $scope.itemsPerPage);
        };

        $scope.$watch('currentPage + itemsPerPage', function() {
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                end = begin + $scope.itemsPerPage;

            $scope.filteredAds = $scope.data.ads.slice(begin, end);
        });
        //end pagination

    });

    homeData.getAllTowns(function (resp) {
        $scope.towns = resp;
    });

    homeData.getAllCategories(function(resp) {
       $scope.categories = resp;
    });


});