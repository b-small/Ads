/**
 * Created by user on 1/5/2015.
 */

adsApp.factory('adminData', function ($resource, $http) {
    $http.defaults.headers.common['Authorization'] = 'Bearer' + userAuthentication.getCurrentUser().access_token;

    var resource = $resource(
        'http://softuni-ads.azurewebsites.net/api/admin/ads/:id',
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        });


    function getAllAds() {
        return $http.get('http://softuni-ads.azurewebsites.net/api/admin/ads');
    }

    function getAdById(id) {
        return $http.get('http://softuni-ads.azurewebsites.net/api/admin/ads/' + id);
    }

    function editAd(id, ad) {
        console.log(id);
        console.log(ad);
        return $http.put('http://softuni-ads.azurewebsites.net/api/admin/ads/' + id, ad);
    }

    function deleteAd(id) {
        return $http.delete('http://softuni-ads.azurewebsites.net/api/admin/ads/' + id);
    }

    function approveAd(id) {
        return $http.put('http://softuni-ads.azurewebsites.net/api/admin/ads/approve/' + id);
    }

    function rejectAd(id){
        return $http.put('http://softuni-ads.azurewebsites.net/api/admin/ads/reject/' + id);
    }

    return {
        getAllAds: getAllAds,
        getAdById: getAdById,
        editAd: editAd,
        deleteAd: deleteAd,
        approveAd: approveAd,
        rejectAd: rejectAd
    }
});