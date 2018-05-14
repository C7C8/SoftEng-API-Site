app.factory("apilist", ["$http", function($http) {
	return $http.get("http://localhost:8000/demo-apis.json")
		.success(function(data){
			return data;
		})
		.error(function(err){
			return err;
		});
}]);