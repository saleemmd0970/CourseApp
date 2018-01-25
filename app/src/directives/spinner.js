app.directive('spinner', [function () {
    return {
        restrict: 'E',
        template: '<div ng-if="pending !== undefined && pending"><i class="fa fa-spinner fa-spin fa-1x"></i></div>',
        scope: {
            pending: '@'
        }
    }
}]);
