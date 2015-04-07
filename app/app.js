'use strict';

angular.module('app', ['ngRoute', 'navigation', 'comments', 'todo'])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/comments', {
                    templateUrl: 'comments/comments.partial.html',
                    controller: 'CommentsController',
                    controllerAs: 'CommentsCtrl',
                    activeTab: 'comments'
                })
                .when('/todo', {
                    templateUrl: 'todo/todo.partial.html',
                    controller: 'TodoController',
                    controllerAs: 'TodoCtrl',
                    activeTab: 'todo'
                })
                .otherwise({
                    redirectTo: '/comments'
                });
        }
    ])
    .config(function(ParseKeyServiceProvider) {
        ParseKeyServiceProvider.applicationId = '3xjCe0yJTgZPS4opWpjg01QwXwGTtr7MuH7p2xdi';
        ParseKeyServiceProvider.restApiKey = 'fAgg7cWchIQuI9L56bvxaTCJUdtNUq5r3ooPNUK6';
    });
