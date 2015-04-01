(function () {
    angular.module('navigation')
        .controller('NavigationController', NavigationController);

    NavigationController.$inject = ['$route'];

    function NavigationController($route) {
        var vm = this;
        vm.$route = $route;
    }
})();