/**
 * Created by user on 1/5/2015.
 */
adsApp.factory('homeData', function ($http, $log) {
    return {
        getResultsPage: function(startPage, townId, categoryId, success) {
            var toAdd = '';
            if (townId != undefined ) {
                toAdd += '&townId=' + townId;
            }
            if(categoryId != undefined) {
                toAdd += '&categoryId=' + categoryId;
            }

            console.log(toAdd);
            $http({method:'GET', url:'http://softuni-ads.azurewebsites.net/api/ads?pageSize=5&startPage=' + startPage + toAdd})

                .success(function(data, status, headers, config) {
                    console.log(startPage);
                    success(data);
                })
                .error(function(data, status, headers, config) {
                    $log.warn(data);
                })
        },

        getAllUserAds: function(adStatus, startPage, success) {
            var toAdd = '';
            if (adStatus != undefined ) {
                toAdd += 'status=' + adStatus + '&';
            }
            console.log("homePage stat " + adStatus);

            $http({method:'GET', url:'http://softuni-ads.azurewebsites.net/api/user/ads?'+ toAdd + 'pagesize=5&startpage=' + startPage})
                .success(function(data, status, headers, config) {
                    console.log(startPage);
                    success(data);
                })
                .error(function(data, status, headers, config) {
                    $log.warn(data);
                })
        },

        getAllTowns: function(success) {
            $http({method:'GET', url:'http://softuni-ads.azurewebsites.net/api/towns'})
                .success(function(data, status, headers, config) {
                    success(data);
                })
                .error(function(data, status, headers, config) {
                    $log.warn(data);
                })
        },

        getAllCategories: function(success) {
            $http({method:'GET', url:'http://softuni-ads.azurewebsites.net/api/categories'})
                .success(function(data, status, headers, config) {
                    success(data);
                })
                .error(function(data, status, headers, config) {
                    $log.warn(data);
                })
        }
    }
});