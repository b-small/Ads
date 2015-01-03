adsApp.controller('NewAdController', function($scope, $http, adsData) {
	$scope.ad = {};
	$http.defaults.headers.common['Authorization'] = "Bearer " + userAuthentication.getCurrentUser().access_token;

	$scope.addAd = function() {
		var dataObject = {
			title: $scope.ad.title,
			text: $scope.ad.text,
			categoryId: $scope.ad.categoryId,
			townId: $scope.ad.townId,
			categoryName: $scope.ad.categoryName,
			townName: $scope.ad.townName

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