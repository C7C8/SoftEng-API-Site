app.factory("apilist", ["$http", function($http) {
	return $http.get("http://localhost:8000/apilist.json")
		.success(function(data){
			//Render description markdown as HTML
			let conv = new showdown.Converter();
			conv.setOption("headerLevelStart", 5);
			for (i in data.classes){
				cl = data.classes[i];
				for (j in cl.apis){
					api = cl.apis[j];
					api.description = conv.makeHtml(api.description.replace(/\\n/g, "\n"));
				}
			}

			return data;
		})
		.error(function(err){
			return err;
		});
}]);