/**
 * Created by user on 1/6/2015.
 */
/**
 * Created by user on 1/5/2015.
 */
adsApp.controller('AdminUserController', function ($scope, $http, $log, $location, $resource, $routeParams, $route, adminData, homeData) {
    $http.defaults.headers.common['Authorization'] = "Bearer " + userAuthentication.getCurrentUser().access_token;
    $scope.user = userAuthentication.getCurrentUser();

    $scope.status = {
        open: false
    };

    var dataType = $routeParams.type;
    $scope.dataType = dataType;
    console.log($scope.dataType);
    console.log("Type!" + dataType);
    var info = {
        startPage: 1,
        pageSize: 20,
        url: 'http://softuni-ads.azurewebsites.net/api/admin/' + dataType + '?'
    };


    var doIt = function () {
        homeData.getResultsPage(info, function (resp) {
            $scope.data = resp;
            if (dataType === 'users') {
                $scope.type = resp.users;
            } else if (dataType === 'towns') {
                $scope.type = resp.towns;
            } else {
                $scope.type = resp.categories;
            }

            $scope.totalAds = $scope.data.numItems;
            console.log($scope.totalAds);
            $scope.itemsPerPage = 20;
        });
    };
    doIt();
    $scope.pageChanged = function (newPage) {
        info.startPage = newPage;
        doIt();
        homeData.getResultsPage(info, function (resp) {
            $scope.data = resp;
        });
    };


    $scope.action = $routeParams.action;

    if ($routeParams.id !== undefined) {
        $scope.cat = $routeParams;
        console.log($scope.cat);

        if(dataType === 'users' && $scope.action === 'delete') {

            

        }

        $scope.action = $routeParams.action;

        $scope.editCategory = function (cat) {
            console.log(cat);
            adminData.editCategoryById($routeParams.id, cat)
                .success(function (resp) {
                    console.log();
                    $location.path('/admin/' + dataType + '/list');
                })
                .error(function (resp) {
                    console.log('Loading ads failed!');
                });
        };

        $scope.editTown = function (cat) {
            console.log(cat);
            adminData.editTownById($routeParams.id, cat)
                .success(function (resp) {
                    $location.path('/admin/' + dataType + '/list');
                })
                .error(function (resp) {
                    console.log('Loading ads failed!');
                });
        };

        $scope.deleteCategory = function () {
            console.log($routeParams.id);
            adminData.deleteCategory($routeParams.id)
                .success(function (resp) {
                    console.log();
                    $location.path('/admin/' + dataType + '/list');
                })
                .error(function (resp) {
                    console.log('Loading ads failed!');
                });
        };

        $scope.deleteTown = function () {
            console.log($routeParams.id);
            adminData.deleteTown($routeParams.id)
                .success(function (resp) {
                    $location.path('/admin/' + dataType + '/list');
                })
                .error(function (resp) {
                    console.log('Loading ads failed!');
                });
        };
    }

    $scope.createCategory = function (cat) {
        console.log(cat);
        adminData.createCategory(cat)
            .success(function (resp) {
                $location.path('/admin/' + dataType + '/list');
            })
            .error(function (resp) {
                console.log('Loading ads failed!');
            });
    };

    $scope.createTown = function (cat) {
        console.log(cat);
        adminData.createTown(cat)
            .success(function (resp) {
                $location.path('/admin/' + dataType + '/list');
            })
            .error(function (resp) {
                console.log('Loading ads failed!');
            });
    }
});