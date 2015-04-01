(function () {
    angular.module('parse')
        .factory('ObjectService', ObjectServiceFactory);

    ObjectServiceFactory.$inject = ['ParseKeyService', '$http', '$q'];

    function ObjectServiceFactory(ParseKeyService, $http, $q) {
        var service = {
            getAllObjects: getAllObjects
        };

        return service;

        function getAllObjects(className) {
            var deferred = $q.defer();

            var config = {
                headers: {
                    'X-Parse-Application-Id': ParseKeyService.applicationId,
                    'X-Parse-REST-API-Key': ParseKeyService.restApiKey
                }
            };

            $http.get(ParseKeyService.restUrl + '/classes/' + className, config)
                .success(function(data) {
                    deferred.resolve(data.results);
                })
                .error(function (data, code) {
                    deferred.reject('Could not get objects: "' + data.error + '" (' + code + ')');
                });

            return deferred.promise;
        }
    }


})();