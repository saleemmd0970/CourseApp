app.directive('showMessage', [function () {
    return {
        restrict: 'E',
        templateUrl: 'src/directives/showMessage.html',
        scope: {
            formControl: '=',
            fieldLabel: '@'
        }
    }
}]);
