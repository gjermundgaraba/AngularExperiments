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
            PLURAL: "You have {NUM, plural, =0{no messages} one{1 message} other{# messages}}.",
            BUTTON_ERROR_400: 'Do 400',
            BUTTON_ERROR_404: 'Do 404',
            BUTTON_ERROR_500: 'Do 500',
            STATUS_MESSAGE_200: 'All OK',
            STATUS_MESSAGE_400: 'Bad Request',
            STATUS_MESSAGE_404: 'Not Found',
            STATUS_MESSAGE_500: 'Internal Server Error'
        });
        $translateProvider.translations('de', {
            TITLE: 'Hallo',
            FOO: 'Dies ist ein Paragraph.',
            BUTTON_LANG_EN: 'Englisch',
            BUTTON_LANG_DE: 'Deutsch',
            BUTTON_LANG_NO: 'Norwegisch',
            PLURAL: "Sie haben {NUM, plural, =0{keine Nachrichten haben} one{1 Nachricht} other{# Nachrichten}}.",
            BUTTON_ERROR_400: '400',
            BUTTON_ERROR_404: '404',
            BUTTON_ERROR_500: '500',
            STATUS_MESSAGE_200: 'Alles OK',
            STATUS_MESSAGE_400: 'Ungültige Anforderung',
            STATUS_MESSAGE_404: 'Nicht Gefunden',
            STATUS_MESSAGE_500: 'Interner Server Fehler'
        });
        $translateProvider.translations('no', {
            TITLE: 'Hei',
            FOO: 'Dette er en paragraf',
            BUTTON_LANG_EN: 'Engelsk',
            BUTTON_LANG_DE: 'Tysk',
            BUTTON_LANG_NO: 'Norsk',
            PLURAL: "Du har {NUM, plural, =0{ingen meldinger} one{1 melding} other{# meldinger}}.",
            BUTTON_ERROR_400: 'Gjør 400',
            BUTTON_ERROR_404: 'Gjør 404',
            BUTTON_ERROR_500: 'Gjør 500',
            STATUS_MESSAGE_200: 'Alt er i orden!',
            STATUS_MESSAGE_400: 'FYFY Request',
            STATUS_MESSAGE_404: 'Fant\'n ikke',
            STATUS_MESSAGE_500: 'Intern Serverfeil'
        });
        $translateProvider.useMessageFormatInterpolation();
        $translateProvider.preferredLanguage('en');
        $translateProvider.fallbackLanguage('en');

    })
    .controller('Controller', function ($scope, $translate) {
        $scope.statusCode = 200;
        $scope.translationData = {
            NUM: 0
        };
        $scope.changeLanguage = function (key) {
            $translate.use(key);
        };
    });