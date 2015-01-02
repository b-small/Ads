adsApp.controller('UserAdsController', function($scope, adsData, $log, $http) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userAuthentication.getCurrentUser().access_token;
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/user/ads", {});


	responsePromise.success(function(dataFromServer) {
		$scope.data = dataFromServer;
 		$scope.filters = { };
		//pagination
		$scope.totalItems = $scope.data.ads.length;
		$scope.currentPage = 1;
		$scope.itemsPerPage = 5;

		$scope.pageCount = function () {
			return Math.ceil($scope.data.ads.length / $scope.itemsPerPage);
		};

		$scope.$watch('currentPage + itemsPerPage', function() {
			var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
				end = begin + $scope.itemsPerPage;

			$scope.filteredAds = $scope.data.ads.slice(begin, end);
		});

		//end pagination
	});

	responsePromise.error(function() {
		alert("Submitting form failed!");
	});
});