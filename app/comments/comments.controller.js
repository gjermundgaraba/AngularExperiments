(function () {
    angular.module('comments')
        .controller('CommentsController', CommentsController);

    CommentsController.$inject = ['ObjectService'];

    function CommentsController(ObjectService) {
        var vm = this;

        vm.comments = [];
        vm.getAllComments = getAllComments;

        getAllComments();

        function getAllComments() {
            ObjectService.getAllObjects('Comment')
                .then(function (data) {
                    vm.comments = data;
                });
        }

    }
})();