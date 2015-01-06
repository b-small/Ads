adsApp.controller('LoginRegisterController', function($scope, $http, $location, loginRegister) {
    $scope.userLog = {};

    $scope.login = function(user) {
        console.log($scope.userLog);
        var dataObject = {
            username: $scope.userLog.username,
            password:$scope.userLog.password
        };

        var responsePromise = loginRegister.login(dataObject);
        responsePromise.success(function(dataFromServer, status, headers, config) {
            console.log(dataFromServer);
            userAuthentication.login(dataFromServer);
            if(dataFromServer.isAdmin) {
                $location.path('/admin/home');
            } else {
                $location.path('/user/home');
            }
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("Login failed!");
        });
    };

    $scope.register = function(user) {
        console.log($scope.userLog);
        var dataObject = {
            username: $scope.userLog.username,
            password:$scope.userLog.password,
            confirmPassword:$scope.userLog.confirmPassword,
            name:$scope.userLog.name,
            email:$scope.userLog.email,
            phone:$scope.userLog.phone,
            townId:$scope.userLog.town
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