/**
 * Created by user on 1/4/2015.
 */
adsApp.controller('EditUserProfileController', function ($scope, $http, $location, $log, userData, notifyService) {
    $http.defaults.headers.common['Authorization'] = "Bearer " + userAuthentication.getCurrentUser().access_token;

    $scope.user = userData.getUser();

    var dataObject = {};
    var pass = {};

    $scope.status = {
        open: false
    };

    $scope.editUserProfile = function (user) {

        dataObject.name = user.name;
        dataObject.email = user.email;
        dataObject.phoneNumber = user.phoneNumber;
        dataObject.townId = user.townId;

        var responsePromise = userData.editUser(dataObject);
        responsePromise.success(function (dataFromServer, status, headers, config) {
            notifyService.showInfo("Successfully edited your profile!");
        });
        responsePromise.error(function (dataFromServer, status, headers, config) {
            notifyService.showError("Editing profile failed!");
        });
    };

    $scope.changePass = function (user) {

        pass = {
            oldPassword: user.oldPass,
            newPassword: user.newPass,
            confirmPassword: user.confPass
        };

        var responsePromise = userData.changePass(pass);
        responsePromise.success(function (dataFromServer, status, headers, config) {
            notifyService.showInfo("Successfully changed your password!");
        });
        responsePromise.error(function (data, status, headers, config) {
            notifyService.showError("Submitting form failed!");
        });
    }
})
;