(function () {
    'use strict';

    describe('CommentsController', function(){
        var controllerInstantiatior,
            controller,
            ObjectService,
            deferred,
            rootScope;

        beforeEach(module('comments'));
        beforeEach(module(function ($provide) {
            ObjectService = {
                getAllObjects: function () {}
            };

            $provide.value('ObjectService', ObjectService);
        }));
        beforeEach(inject(function($controller, $q, $rootScope) {
            rootScope = $rootScope.$new();
            deferred = $q.defer();
            controllerInstantiatior = $controller;
        }));
        beforeEach(function() {
            spyOn(ObjectService, 'getAllObjects').andReturn(deferred.promise);
            controller = controllerInstantiatior('CommentsController');
        });

        describe('Startup', function () {
            it('should set up comments data', function() {
                expect(controller.comments).toBeDefined();
            });

            it('should get all comments', function() {
                deferred.resolve([{}, {}]);
                rootScope.$digest();

                expect(controller.comments.length).toBe(2);
            });
        });


    });

})();