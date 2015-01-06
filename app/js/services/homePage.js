/**
 * Created by user on 12/29/2014.
 */
adsApp.factory('homeData', function ($http, $log) {
    return {
        getResultsPage: function(info, success) {
            var toAdd = '';

            if (info.pageSize != undefined ) {
                toAdd += 'pageSize=' + info.pageSize;
            } else {
                toAdd += 'pageSize=' + 5;
            }

            if(info.startPage != undefined) {
                toAdd += '&startPage=' + info.startPage;
            } else {
                toAdd += '&startPage=' + 1;
            }
            if (info.townId != undefined ) {
                toAdd += '&townId=' + info.townId;
            }
            if(info.categoryId != undefined) {
                toAdd += '&categoryId=' + info.categoryId;
            }
            if (info.adStatus != undefined ) {
                toAdd += '&status=' + info.adStatus;
            }

            console.log(toAdd);
           $http({method:'GET', url: info.url + toAdd})
               .success(function(data, status, headers, config) {
                    success(data);
                })
               .error(function(data, status, headers, config) {
                    $log.warn(data);
                });
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