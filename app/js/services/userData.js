/**
 * Created by user on 1/4/2015.
 */
/**
 * Created by user on 1/2/2015.
 */
adsApp.factory('userData', function ($resource, $http) {
    $http.defaults.headers.common['Authorization'] = 'Bearer' + userAuthentication.getCurrentUser().access_token;

    var resource = $resource(
        'http://softuni-ads.azurewebsites.net/api/user/profile',
        {
            update: {
                method: 'PUT'
            }
        }
    );

    function getUserProfile() {
        return resource.get();
    }

    function editUserProfile(user) {
        return $http.put("http://softuni-ads.azurewebsites.net/api/user/profile", user);
    }

    function changePassword(password) {
        return $http.put('http://softuni-ads.azurewebsites.net/api/user/changePassword', password);
    }

    return {
        getUser: getUserProfile,
        editUser: editUserProfile,
        changePass: changePassword
    }
});