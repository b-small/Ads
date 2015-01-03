/**
 * Created by user on 12/29/2014.
 */
adsApp.factory('homeData', function ($http, $log) {
    return {
        getAllAds: function (success, townId, categoryId) {
            $http({method:'GET', url:'http://softuni-ads.azurewebsites.net/api/ads'})
                .success(function(data, status, headers, config) {
                success(data);
            })
            .error(function(data, status, headers, config) {
                $log.warn(data);
            })
        },

        getResultsPage: function(startPage, success) {
            $http({method:'GET', url:'http://softuni-ads.azurewebsites.net/api/ads?pageSize=5&startPage=' + startPage})
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