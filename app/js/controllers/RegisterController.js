adsApp.controller('RegisterController', function($scope, $http, $location) {
    $scope.user = {};
    $scope.user.submitTheForm = function(item, event) {
        console.log($scope.user);
        var dataObject = {
            username: $scope.user.username,
            password:$scope.user.password,
            confirmPassword:$scope.user.password + 'a',
            name:$scope.user.name,
            email:$scope.user.email,
            phone:$scope.user.phone,
            townId:1
        };

        var responsePromise = $http.post("http://softuni-ads.azurewebsites.net/api/user/register", dataObject, {});
        responsePromise.success(function(dataFromServer, status, headers, config) {
            console.log(dataFromServer);
            $location.path( '/user' );
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("Submitting form failed!");
        });
    }
});