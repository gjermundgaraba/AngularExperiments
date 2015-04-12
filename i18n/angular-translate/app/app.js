'use strict';

angular.module('app', ['pascalprecht.translate'])
    .config(function ($translateProvider) {
        /* Prefered way:
         $translateProvider.useUrlLoader('foo/bar.json');
         $translateProvider.preferredLanguage('en');
         // the example above actually requests foo/bar.json?lang=en
         */

        /* Heavy way: */
        $translateProvider.translations('en', {
            TITLE: 'Hello',
            FOO: 'This is a paragraph.',
            BUTTON_LANG_EN: 'English',
            BUTTON_LANG_DE: 'German',
            BUTTON_LANG_NO: 'Norwegian',
            PLURAL: "{NUM, select, 0{No} 1{One} other{NUM}} new messages"
        });
        $translateProvider.translations('de', {
            TITLE: 'Hallo',
            FOO: 'Dies ist ein Paragraph.',
            BUTTON_LANG_EN: 'Englisch',
            BUTTON_LANG_DE: 'Deutsch',
            BUTTON_LANG_NO: 'Norwegisch'
        });
        $translateProvider.translations('no', {
            TITLE: 'Hei',
            FOO: 'Dette er en paragraf',
            BUTTON_LANG_EN: 'Engelsk',
            BUTTON_LANG_DE: 'Tysk',
            BUTTON_LANG_NO: 'Norsk'
        });
        $translateProvider.preferredLanguage('en');
    })
    .controller('Controller', function ($scope, $translate) {
        $scope.changeLanguage = function (key) {
            $translate.use(key);
        };
    });