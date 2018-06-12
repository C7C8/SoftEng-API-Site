app.service("auth", ["$http", function($http){

	/**
	 * Login, get an auth token
	 * @param uname Username to log in with
	 * @param passw Password of user
	 * @return Promise from an http get...
	 */
	this.login = function(uname, passw){
		return $http.get("http://localhost:5000/api/auth", {params: {username: uname, password: passw}});

	};

	/**
	 * Register a new user
	 * @param uname Username to register
	 * @param passw Password to set
	 * @return Promise from an http post
	 */
	this.register = function(uname, passw){
		return $http.post("http://localhost:5000/api/auth", {username: uname, password: passw});
	};
}]);