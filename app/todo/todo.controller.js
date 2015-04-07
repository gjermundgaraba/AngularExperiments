(function () {
    angular.module('todo')
        .controller('TodoController', TodoController);

    TodoController.$inject = ['ObjectService'];

    function TodoController(ObjectService) {
        var vm = this;
        vm.todos = [];
        vm.getAllTodos = getAllTodos;

        getAllTodos();

        function getAllTodos() {
            ObjectService.getAllObjects('Todo')
                .then(function (data) {
                    vm.todos = data;
                });
        }
    }
})();