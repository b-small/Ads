adsApp.controller('LoginRegisterController', function($scope, $http, $location, loginRegister, $resource) {
    $scope.user = {};
    $scope.login = function(user) {
        console.log($scope.user);
        var dataObject = {
            username: $scope.user.username,
            password:$scope.user.password
        };

        var responsePromise = loginRegister.login(dataObject);
        responsePromise.success(function(dataFromServer, status, headers, config) {
            console.log(dataFromServer);
            userAuthentication.login(dataFromServer);
            $location.path( '/user/home' );
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("Login failed!");
        });
    };

    $scope.register = function(user) {
        console.log($scope.user);
        var dataObject = {
            username: $scope.user.username,
            password:$scope.user.password,
            confirmPassword:$scope.user.confirmPassword,
            name:$scope.user.name,
            email:$scope.user.email,
            phone:$scope.user.phone,
            townId:$scope.user.town
        };

        var responsePromise = loginRegister.register(user);
        responsePromise.success(function(dataFromServer, status, headers, config) {
            userAuthentication.login(dataFromServer);
            $location.path( '/user/home' );
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("Register form failed!");
        });
    };
});