adsApp.controller('UserAdsController', function($scope, adsData, homeData, $http) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userAuthentication.getCurrentUser().access_token;
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/user/ads", {});

var selStat;

	var doIt = function() {
		homeData.getAllUserAds(selStat, 1, function(resp) {
			$scope.data = resp;
			$scope.totalAds = $scope.data.numItems;
			$scope.itemsPerPage = 5;
		});
	};

	$scope.pageChanged = function(newPage) {
		homeData.getAllUserAds(selStat, newPage, function(resp) {
			$scope.data = resp;
		});
	};

	$scope.setSelectedStatus = function (value) {
		if ($scope.selectedStatus === value) {
			$scope.selectedStatus = undefined;

		} else {
			$scope.selectedStatus = value;
		}
		selStat = $scope.selectedStatus;
		console.log("Status" + selStat);
		doIt();
	};

	responsePromise.error(function() {
		alert("Submitting form failed!");
	});
});