app.directive('apiCard', function() {
	return {
		restrict: 'E',
		scope: {
			api: '='
		},
		templateUrl: 'directives/api-card.html'
	};
});