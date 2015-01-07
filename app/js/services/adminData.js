/**
 * Created by user on 1/5/2015.
 */

adsApp.factory('adminData', function ($resource, $http) {
    $http.defaults.headers.common['Authorization'] = 'Bearer' + userAuthentication.getCurrentUser().access_token;

    function getAllAds() {
        return $http.get('http://softuni-ads.azurewebsites.net/api/admin/ads');
    }

    function getAdById(id) {
        return $http.get('http://softuni-ads.azurewebsites.net/api/admin/ads/' + id);
    }

    function editAd(id, ad) {
        return $http.put('http://softuni-ads.azurewebsites.net/api/admin/ads/' + id, ad);
    }

    function deleteAd(id) {
        return $http.delete('http://softuni-ads.azurewebsites.net/api/admin/ads/' + id);
    }

    function approveAd(id) {
        return $http.put('http://softuni-ads.azurewebsites.net/api/admin/ads/approve/' + id);
    }

    function rejectAd(id) {
        return $http.put('http://softuni-ads.azurewebsites.net/api/admin/ads/reject/' + id);
    }

    function editTownById(id, town) {
        return $http.put('http://softuni-ads.azurewebsites.net/api/admin/towns/' + id, town);
    }

    function editCategoryById(id, category) {
        return $http.put('http://softuni-ads.azurewebsites.net/api/admin/categories/' + id, category);
    }

    function deleteTown(id) {
        return $http.delete('http://softuni-ads.azurewebsites.net/api/admin/towns/' + id);
    }

    function deleteCategory(id) {
        return $http.delete('http://softuni-ads.azurewebsites.net/api/admin/categories/' + id);
    }

    function createTown(cat) {
        return $http.post('http://softuni-ads.azurewebsites.net/api/admin/towns', cat);
    }

    function createCategory(cat) {
        return $http.post('http://softuni-ads.azurewebsites.net/api/admin/categories', cat);
    }

    function deleteUser(username) {
        return $http.delete('http://softuni-ads.azurewebsites.net/api/admin/user/' + username);
    }

    return {
        getAllAds: getAllAds,
        getAdById: getAdById,
        editAd: editAd,
        deleteAd: deleteAd,
        approveAd: approveAd,
        rejectAd: rejectAd,
        editTownById: editTownById,
        editCategoryById: editCategoryById,
        deleteTown: deleteTown,
        deleteCategory: deleteCategory,
        createTown: createTown,
        createCategory: createCategory,
        deleteUser: deleteUser
    }
});