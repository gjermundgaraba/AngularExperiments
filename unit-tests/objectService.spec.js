(function () {
    'use strict';

    describe('ObjectService', function(){

        var httpBackend, ObjectServiceTestObject, ParseKeyService;

        beforeEach(module('parse'));
        beforeEach(module(function ($provide) {
            ParseKeyService = {
                restUrl: '',
                applicationId: 'appid',
                restApiKey: 'apikey'
            };

            $provide.value('ParseKeyService', ParseKeyService);
        }));
        beforeEach(inject(function($httpBackend, ObjectService) {
            httpBackend = $httpBackend;
            ObjectServiceTestObject = ObjectService;
        }));

        describe('GET all objects of a class', function () {
            it('should return data on successful API call', function () {
                httpBackend.whenGET('/classes/test').respond(200, {results: [{}, {}]});

                var data;
                ObjectServiceTestObject.getAllObjects('test').then(function(returnData) {
                    data = returnData;
                });

                httpBackend.flush();
                expect(data).toBeDefined();
                expect(data.length).toBe(2);
            });

            it('should return an error when API call fails', function () {
                httpBackend.whenGET('/classes/test').respond(500, {error: 'server error'});

                var error;
                ObjectServiceTestObject.getAllObjects('test').catch(function (e) {
                    error = e;
                });

                httpBackend.flush();
                expect(error).toBeDefined();
            })
        });

        describe('headers', function () {
            it('should set appropriate headers', function () {
                httpBackend.expectGET('/classes/test', function(headers) {
                    return (headers['X-Parse-Application-Id'] === ParseKeyService.applicationId)
                            &&
                            (headers['X-Parse-REST-API-Key'] === ParseKeyService.restApiKey);
                }).respond(200, {});

                ObjectServiceTestObject.getAllObjects('test');

                httpBackend.flush();
            });
        });

    });
})();