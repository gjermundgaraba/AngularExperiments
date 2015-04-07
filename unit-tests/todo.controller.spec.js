(function () {
    'use strict';

    describe('CommentsController', function(){
        var controllerInstantiator,
            controller,
            ObjectService,
            getDeferred,
            postDeferred,
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
            getDeferred = $q.defer();
            postDeferred = $q.defer();
            controllerInstantiator = $controller;
        }));
        beforeEach(function() {
            spyOn(ObjectService, 'getAllObjects').andReturn(getDeferred.promise);
            spyOn(ObjectService, 'postObject').andReturn(postDeferred.promise);

            controller = controllerInstantiator('TodoController');
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
    });

})();