'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {

    browser.get('');

    it('should automatically redirect to /comments on startup', function () {
        expect(browser.getLocationAbsUrl()).toMatch("/comments");
    });

    it('should set tabs to active when switching tabs', function () {
        browser.get('#/comments');
        expect(element.all(by.css('.active a')).first().getText()).toBe('Comments');

        browser.get('#/todo');
        expect(element.all(by.css('.active a')).first().getText()).toBe('Todo');
    });

    describe('Comments', function () {
    });

    /*describe('view1', function() {

     beforeEach(function() {
     browser.get('index.html#/view1');
     });


     it('should render view1 when user navigates to /view1', function() {
     expect(element.all(by.css('[ng-view] p')).first().getText()).
     toMatch(/partial for view 1/);
     });

     });


     describe('view2', function() {

     beforeEach(function() {
     browser.get('index.html#/view2');
     });


     it('should render view2 when user navigates to /view2', function() {
     expect(element.all(by.css('[ng-view] p')).first().getText()).
     toMatch(/partial for view 2/);
     });

     });*/
});
