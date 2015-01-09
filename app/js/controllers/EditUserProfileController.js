/**
 * Created by user on 1/4/2015.
 */
adsApp.controller('EditUserProfileController', function ($scope, $http, $location, $log, $routeParams, userData, adminData, notifyService) {
    $http.defaults.headers.common['Authorization'] = "Bearer " + userAuthentication.getCurrentUser().access_token;
    $scope.user = userAuthentication.getCurrentUser();
    $scope.currentUser = {};
    $scope.isUserAdmin = userAuthentication.getCurrentUser().isAdmin;

    if(!userAuthentication.getCurrentUser().isAdmin) {
        $scope.currentUser = $scope.user;
    } else {
        var responsePromise = adminData.getUsers();
        responsePromise.success(function(dataFromServer, status, headers, config) {

            for(var i=0; i < dataFromServer.users.length;i++){
                if(dataFromServer.users[i].username == $routeParams.username)
                    $scope.currentUser = dataFromServer.users[i];
            }	});
        responsePromise.error(function(data, status, headers, config) {
            alert("Submitting form failed!");
        });
    }

    var dataObject = {};
    var pass = {};

    $scope.status = {
        open: false
    };

    console.log($scope.user);
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
            notifyService.showError("Editing profile failed! Checkbox?");
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
    };

    $scope.editUserProfileAdmin = function(user) {
        dataObject.name = user.name;
        dataObject.email = user.email;
        dataObject.phoneNumber = user.phoneNumber;
        dataObject.townId = user.townId;
        dataObject.isAdmin = user.isAdmin;
        console.log(dataObject);

        adminData.editUser($routeParams.username, dataObject)
        .success(function (dataFromServer, status, headers, config) {
                $location.path('admin/users/list');
            notifyService.showInfo("Successfully edited " + $routeParams.username + "'s profile!");
        })
       .error(function (dataFromServer, status, headers, config) {
            notifyService.showError("Editing profile failed!");
        });
    };

    $scope.changeUserPasswordAdmin = function(user) {
        var currentUser = {
            username: user.username,
            newPassword: user.newPass,
            confirmPassword: user.confPass
        };

        adminData.editUserPassword(currentUser)
            .success(function (dataFromServer, status, headers, config) {
                $location.path('admin/users/list');
                notifyService.showInfo("Successfully edited " + $routeParams.username + "'s password!");
            })
            .error(function (dataFromServer, status, headers, config) {
                notifyService.showError("Editing password failed!");
            });
    }
});