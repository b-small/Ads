/**
 * Created by user on 12/29/2014.
 */
adsApp.factory('homeData', function ($http, $log) {
    return {
        getAllAds: function (success) {
            $http({method:'GET', url:'http://softuni-ads.azurewebsites.net/api/ads/ads?PageSize=10&startpage=1'})
                .success(function(data, status, headers, config) {
                success(data);
            })
            .error(function(data, status, headers, config) {
                log.warn(data);
            })
        }
    }
});