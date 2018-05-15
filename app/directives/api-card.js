app.directive('apiCard', function() {
	return {
		restrict: 'E',
		scope: {
			api: '='
		},
		templateUrl: 'directives/api-card.html',
		link: function(scope, element, attrs) {
			scope.toggleAPIView = function ($event){
				$($event.currentTarget).toggleClass("select-chevron-expand", 400);
				$($event.currentTarget).parent().siblings().slideToggle(400);
			}
		}
	};
});