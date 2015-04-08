(function () {
    angular.module('todo')
        .controller('TodoController', TodoController);

    TodoController.$inject = ['ObjectService', '$scope'];

    function TodoController(ObjectService, $scope) {
        var vm = this;
        vm.todos = [];
        vm.getAllTodos = getAllTodos;
        vm.postNewTodo = postNewTodo;

        getAllTodos();

        function getAllTodos() {
            ObjectService.getAllObjects('Todo')
                .then(function (data) {
                    vm.todos = data;
                });
        }

        function postNewTodo() {
            if (vm.newTodoTitle.trim()) {
                var todo = {
                    title: vm.newTodoTitle
                };

                ObjectService.postObject('Todo', todo)
                    .then(function(data) {
                        vm.newTodoTitle = '';
                        $scope.todoForm.$setPristine();
                        todo.objectId = data.objectId;
                        vm.todos.push(todo);
                    });
            }

        }
    }
})();