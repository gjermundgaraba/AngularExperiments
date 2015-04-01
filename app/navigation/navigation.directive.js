(function () {
    angular.module('navigation')
        .directive('navigation', NavigationDirective);

    function NavigationDirective() {
        return {
            restrict: 'E',
            templateUrl: 'navigation/navigation.partial.html',
            controller: 'NavigationController',
            controllerAs: 'NavigationCtrl'
        }
    }
})();