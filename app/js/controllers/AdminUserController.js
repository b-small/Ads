/**
 * Created by user on 1/6/2015.
 */
/**
 * Created by user on 1/5/2015.
 */
adsApp.controller('AdminUserController', function ($scope, $http, $log, $location, $resource, $routeParams, $route, adminData, homeData, notifyService) {
    $http.defaults.headers.common['Authorization'] = "Bearer " + userAuthentication.getCurrentUser().access_token;
    $scope.user = userAuthentication.getCurrentUser();
    $scope.action = $routeParams.action;

    $scope.status = {
        open: false
    };

    var dataType = $routeParams.type;
    $scope.dataType = dataType;

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

            $scope.itemsPerPage = 20;
            $scope.numPages = Math.ceil($scope.totalAds/$scope.itemsPerPage);

        });
    };

    $scope.pageChanged = function (newPage) {
        info.startPage = newPage;
        doIt();
        homeData.getResultsPage(info, function (resp) {
            $scope.data = resp;
        });
    };

    if ($routeParams.id !== undefined) {

        $scope.cat = $routeParams;
        $scope.action = $routeParams.action;

        $scope.editCategory = function (cat) {
            adminData.editCategoryById($routeParams.id, cat)
                .success(function (resp) {
                    $location.path('/admin/' + dataType + '/list');
                    notifyService.showInfo("Edited category successfully!");
                })
                .error(function (resp) {
                    notifyService.showError("Editing category failed!");
                });
        };


        $scope.editTown = function (cat) {
            adminData.editTownById($routeParams.id, cat)
                .success(function (resp) {
                    $location.path('/admin/' + dataType + '/list');
                })
                .error(function (resp) {
                    notifyService.showError("Editing town failed!");
                });
        };


        $scope.deleteCategory = function () {
            adminData.deleteCategory($routeParams.id)
                .success(function (resp) {
                    $location.path('/admin/' + dataType + '/list');
                    notifyService.showInfo("Deleted category successfully!");
                })
                .error(function (resp) {
                    notifyService.showError("Deleting category failed!");
                });
        };


        $scope.deleteUser = function () {
            adminData.deleteUser($routeParams.id)
                .success(function (resp) {
                    $location.path('/admin/' + dataType + '/list');
                    notifyService.showInfo("Deleted user successfully!");
                })
                .error(function (resp) {
                    notifyService.showError("Deleting user failed!");
                });
        };


        $scope.deleteTown = function () {
            adminData.deleteTown($routeParams.id)
                .success(function (resp) {
                    $location.path('/admin/' + dataType + '/list');
                    notifyService.showInfo("Deleted town successfully!");
                })
                .error(function (resp) {
                    notifyService.showError("Deleting town failed!");
                });
        };
    }


    $scope.createCategory = function (cat) {
        console.log(cat);
        adminData.createCategory(cat)
            .success(function (resp) {
                $location.path('/admin/' + dataType + '/list');
                notifyService.showInfo("Created category successfully!");
            })
            .error(function (resp) {
                notifyService.showError("Creating category failed!");
            });
    };


    $scope.createTown = function (cat) {
        console.log(cat);
        adminData.createTown(cat)
            .success(function (resp) {
                $location.path('/admin/' + dataType + '/list');
                notifyService.showInfo("Created town successfully!");
            })
            .error(function (resp) {
                notifyService.showError("Creating town failed!");
            });
    };

    doIt();
});