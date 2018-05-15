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
				let toggleable = $($event.currentTarget).parent().siblings();
				$(toggleable[0]).slideToggle(400);
				$(toggleable[1]).slideToggle(400);
			}
		}
	};
});