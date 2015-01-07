/**
 * Created by user on 12/29/2014.
 */
adsApp.factory('homeData', function ($http, $log, notifyService) {
    return {

        getResultsPage: function (info, success) {
            var toAdd = '';

            if (info.pageSize != undefined) {
                toAdd += 'pageSize=' + info.pageSize;
            } else {
                toAdd += 'pageSize=' + 5;
            }

            if (info.startPage != undefined) {
                toAdd += '&startPage=' + info.startPage;
            } else {
                toAdd += '&startPage=' + 1;
            }

            if (info.townId != undefined) {
                toAdd += '&townId=' + info.townId;
            }

            if (info.categoryId != undefined) {
                toAdd += '&categoryId=' + info.categoryId;
            }

            if (info.adStatus != undefined) {
                toAdd += '&status=' + info.adStatus;
            }

            $http({method: 'GET', url: info.url + toAdd})
                .success(function (data, status, headers, config) {
                    success(data);
                })
                .error(function (data, status, headers, config) {
                    notifyService.showError("Loading ads failed!");
                });
        },

        getAllTowns: function (success) {
            $http({method: 'GET', url: 'http://softuni-ads.azurewebsites.net/api/towns'})
                .success(function (data, status, headers, config) {
                    success(data);
                })
                .error(function (data, status, headers, config) {
                    notifyService.showError("Loading towns failed!");
                })
        },

        getAllCategories: function (success) {
            $http({method: 'GET', url: 'http://softuni-ads.azurewebsites.net/api/categories'})
                .success(function (data, status, headers, config) {
                    success(data);
                })
                .error(function (data, status, headers, config) {
                    notifyService.showError("Loading categories failed!");
                })
        }
    }
});