adsApp.controller('UserAdsController', function($scope, adsData, homeData, $http) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userAuthentication.getCurrentUser().access_token;
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/user/ads", {});


	homeData.getAllUserAds(1, function(resp) {
		$scope.data = resp;
		$scope.totalAds = $scope.data.numItems;
		$scope.itemsPerPage = 5;
	});



	$scope.pageChanged = function(newPage) {
		homeData.getAllUserAds(newPage, function(resp) {
			$scope.data = resp;
		});
	};
	responsePromise.error(function() {
		alert("Submitting form failed!");
	});
});