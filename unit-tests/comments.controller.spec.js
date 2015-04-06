(function () {
    'use strict';

    describe('CommentsController', function(){
        var controllerInstantiatior,
            controller,
            ObjectService,
            getDeferred,
            postDeferred,
            rootScope;

        beforeEach(module('comments'));
        beforeEach(module(function ($provide) {
            ObjectService = {
                getAllObjects: function () {},
                postObject: function() {}
            };

            $provide.value('ObjectService', ObjectService);
        }));
        beforeEach(inject(function($controller, $q, $rootScope) {
            rootScope = $rootScope.$new();
            getDeferred = $q.defer();
            postDeferred = $q.defer();
            controllerInstantiatior = $controller;
        }));
        beforeEach(function() {
            spyOn(ObjectService, 'getAllObjects').andReturn(getDeferred.promise);
            spyOn(ObjectService, 'postObject').andReturn(postDeferred.promise);

            controller = controllerInstantiatior('CommentsController');
            getDeferred.resolve([{}, {}]);
            rootScope.$digest();
        });


        describe('Startup', function () {
            it('should set up comments data', function() {
                expect(controller.comments).toBeDefined();
            });

            it('should get all comments', function() {
                expect(controller.comments.length).toBe(2);
            });
        });


        describe('Create comment', function () {

            describe('with success', function () {
                beforeEach(function () {
                    controller.newCommentText = 'Comment Text...';
                    controller.newWrittenBy = 'Some name';
                });

                it('should call objectService', function () {
                    controller.postNewComment();

                    expect(ObjectService.postObject).toHaveBeenCalledWith('Comment', {
                        commentText: controller.newCommentText,
                        writtenBy: controller.newWrittenBy
                    })
                });

                it('should update comments when ObjectService returns with success', function () {
                    controller.postNewComment();

                    postDeferred.resolve({
                        "createdAt": "2015-04-03T09:45:21.887Z",
                        "objectId": "NffSHE7a8T"
                    });
                    rootScope.$digest();

                    var commentsLength = controller.comments.length;
                    expect(commentsLength).toBe(3);
                    expect(controller.comments[commentsLength -1].objectId).toBe('NffSHE7a8T');
                });

                it('should not update comments when ObjectService returns with failure', function () {
                    controller.postNewComment();

                    postDeferred.reject('Something went wrong');
                    rootScope.$digest();

                    expect(controller.comments.length).toBe(2);

                });
            });



            describe('illegal data', function() {
                it('should not create comment with empty comment text', function() {
                    controller.newCommentText = '';
                    controller.newWrittenBy = 'Some name';

                    controller.postNewComment();

                    expect(ObjectService.postObject).not.toHaveBeenCalled();
                });

                it('should not create comment with empty written by', function() {
                    controller.newCommentText = 'Comment Text...';
                    controller.newWrittenBy = '';

                    controller.postNewComment();

                    expect(ObjectService.postObject).not.toHaveBeenCalled();
                });

                it('should not create comment with whitespace comment text', function() {
                    controller.newCommentText = ' ';
                    controller.newWrittenBy = 'Some name';

                    controller.postNewComment();

                    expect(ObjectService.postObject).not.toHaveBeenCalled();
                });

                it('should not create comment with whitespace written by', function() {
                    controller.newCommentText = 'Comment Text...';
                    controller.newWrittenBy = ' ';

                    controller.postNewComment();

                    expect(ObjectService.postObject).not.toHaveBeenCalled();
                });
            });
        });
    });

})();