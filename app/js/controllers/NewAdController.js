adsApp.controller('NewAdController', function($scope, $http, $location, $log, adsData) {
	$scope.ad = {};

	$scope.addAd = function() {
		$http.defaults.headers.common['Authorization'] = "Bearer " + userAuthentication.getCurrentUser().access_token;

		var dataObject = {
			title: $scope.ad.title,
			text: $scope.ad.text,
			categoryId: $scope.ad.categoryId,
			townId: $scope.ad.townId
		};

		adsData.create(dataObject)
			.$promise
			.then(function (data) {
				console.log(data);
				$location.path('/user/ads');
			},
			function (error) {
				$log.error(error);
			});
	};

	$scope.cancelAdd = function () {

	};
});