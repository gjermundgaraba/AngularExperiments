(function () {
    angular.module('comments')
        .controller('CommentsController', CommentsController);

    CommentsController.$inject = ['ObjectService'];

    function CommentsController(ObjectService) {
        var vm = this;

        vm.comments = [];
        vm.getAllComments = getAllComments;
        vm.postNewComment = postNewComment;

        getAllComments();

        function getAllComments() {
            ObjectService.getAllObjects('Comment')
                .then(function (data) {
                    vm.comments = data;
                });
        }

        function postNewComment() {
            if (vm.newCommentText.trim() && vm.newWrittenBy.trim()) {
                var comment = {
                    commentText: vm.newCommentText,
                    writtenBy: vm.newWrittenBy
                };

                ObjectService.postObject('Comment', comment)
                    .then(function(data) {
                        comment.objectId = data.objectId;
                        vm.comments.push(comment);
                    });
            }

        }

    }
})();