/**
 * Created by user on 1/2/2015.
 */
adsApp.factory('adsData', function ($resource, $http) {
    $http.defaults.headers.common['Authorization'] = 'Bearer' + userAuthentication.getCurrentUser().access_token;

    var resource = $resource(
        'http://softuni-ads.azurewebsites.net/api/user/ads/:id',
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        });

    var deactivateResource = $resource(
        'http://softuni-ads.azurewebsites.net/api/user/ads/deactivate/:id',
        {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        }

    );

    var publishAgainResource = $resource(
        'http://softuni-ads.azurewebsites.net/api/user/ads/publishagain/:id',
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        }
    );

    function getAllAds() {
        return resource.get();
    }

    function createNewAd(ad) {
        return resource.save(ad);
    }

    function getAdById(id) {
        return resource.get({id: id});
    }

    function editAd(id, ad) {
        return resource.update({id: id}, ad);
    }

    function deleteAd(id) {
        return resource.delete({id: id});
    }

    function deactivateAd(id) {
        return deactivateResource.update({id: id});
    }

    function publishAgainAd(id){
        return publishAgainResource.update({id:id});
    }

    return {
        getAll: getAllAds,
        create: createNewAd,
        getById: getAdById,
        edit: editAd,
        delete: deleteAd,
        deactivate: deactivateAd,
        publishAgain: publishAgainAd
    }
});