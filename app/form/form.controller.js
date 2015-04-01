(function () {
    angular.module('form')
        .controller('FormController', FormController);

    function FormController() {
        this.hello = 'Hello Angular Experiments World, from forms!';
    }
})();