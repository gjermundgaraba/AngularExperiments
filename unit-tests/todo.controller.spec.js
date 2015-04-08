(function () {
    'use strict';

    describe('CommentsController', function(){
        var controllerInstantiator,
            controller,
            ObjectService,
            getDeferred,
            postDeferred,
            scope,
            rootScope;

        beforeEach(module('todo'));
        beforeEach(module(function ($provide) {
            ObjectService = {
                getAllObjects: function () {},
                postObject: function() {}
            };

            $provide.value('ObjectService', ObjectService);
        }));
        beforeEach(inject(function($controller, $q, $rootScope) {
            rootScope = $rootScope.$new();
            scope = $rootScope.$new();
            getDeferred = $q.defer();
            postDeferred = $q.defer();
            controllerInstantiator = $controller;
        }));
        beforeEach(function() {
            spyOn(ObjectService, 'getAllObjects').andReturn(getDeferred.promise);
            spyOn(ObjectService, 'postObject').andReturn(postDeferred.promise);

            scope.todoForm = {
                $setPristine: function() {}
            };

            controller = controllerInstantiator('TodoController', {$scope: scope});
            getDeferred.resolve([{}, {}]);
            rootScope.$digest();
        });


        describe('Startup', function () {
            it('should set up todos', function() {
                expect(controller.todos).toBeDefined();
            });

            it('should get all todos', function() {
                expect(controller.todos.length).toBe(2);
            });
        });

        describe('Create todo', function () {

            describe('with success', function () {
                beforeEach(function () {
                    controller.newTodoTitle = 'Something todo';
                });

                it('should clear form', function() {
                    spyOn(scope.todoForm, '$setPristine');

                    controller.postNewTodo();

                    postDeferred.resolve({
                        "createdAt": "2015-04-03T09:45:21.887Z",
                        "objectId": "NffSHE7a8T"
                    });
                    rootScope.$digest();

                    expect(controller.newTodoTitle).toBe('');
                    expect(scope.todoForm.$setPristine).toHaveBeenCalled();
                });

                it('should call objectService', function () {
                    controller.postNewTodo();

                    expect(ObjectService.postObject).toHaveBeenCalledWith('Todo', {
                        title: controller.newTodoTitle
                    })
                });

                it('should update todos when ObjectService returns with success', function () {
                    controller.postNewTodo();

                    postDeferred.resolve({
                        "createdAt": "2015-04-03T09:45:21.887Z",
                        "objectId": "NffSHE7a8T"
                    });
                    rootScope.$digest();

                    var todosLength = controller.todos.length;
                    expect(todosLength).toBe(3);
                    expect(controller.todos[todosLength -1].objectId).toBe('NffSHE7a8T');
                });

                it('should not update todos when ObjectService returns with failure', function () {
                    controller.postNewTodo();

                    postDeferred.reject('Something went wrong');
                    rootScope.$digest();

                    expect(controller.todos.length).toBe(2);

                });
            });

            describe('illegal data', function() {
                it('should not create todo with empty title', function() {
                    controller.newTodoTitle = '';

                    controller.postNewTodo();

                    expect(ObjectService.postObject).not.toHaveBeenCalled();
                });

                it('should not create todo with whitespace only in title', function() {
                    controller.newTodoTitle = ' ';

                    controller.postNewTodo();

                    expect(ObjectService.postObject).not.toHaveBeenCalled();
                });
            });
        });
    });

})();