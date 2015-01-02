adsApp.controller('NewAdController', function($scope, $location, $log, adsData) {
	$scope.addAd = function (ad) {
		adsData.create(ad)
			.$promise
			.then(function (data) {
				console.log(data);
				$location.path('/user/ads');
			},
			function (error) {
				$log.error(error);
			});
	}

	$scope.cancelAdd = function () {
		
	}
});