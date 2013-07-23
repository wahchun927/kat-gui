'use strict';

describe('ViTech provided tests for index loaded partials', function() {
  var pauseAll = false;
  //You can load the runner with runner.html?pauseAll=true to see each page after each test.
  pauseAll = window.location.search.replace( "?pauseAll=", "" );
  
  //You can reload a page before every test if desired.
  //This can slow testing down but make test much more consistent.
  beforeEach(function() {
    browser().navigateTo('../../app/index.html?test_with=app-test.js');
  });

  it('should render teach when user navigates to #teach', function() {
      
      browser().navigateTo('#teach');
      
      expect(browser().location().url()).toBe("/teach");
      //You can select all the text from all h5 or any other html element
      //expect(element('h2').text()).
      //  toMatch("This is a heading");
      if (pauseAll) pause();
  });

  it('should render create when user navigates to #quest', function() {
      
      browser().navigateTo('#quests');
      
      expect(browser().location().url()).toBe("/quests");
      //You can select all the text from all h5 or any other html element
      //expect(element('#myCarousel .ng-scope:nth-child(1) .ng-binding').text()).
      //  toMatch("The Spy Who Coded");//"The Spy Who Coded"
      if (pauseAll) pause();
  });

  it('should render home when user navigates to #home', function() {
      
      browser().navigateTo('#home');
      
      expect(browser().location().url()).toBe("/home");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

  it('should render profile when user navigates to #profile', function() {
      
      browser().navigateTo('#profile');
      
      expect(browser().location().url()).toBe("/profile");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

  it('should render storyboard when user navigates to #storyboard', function() {
      
      browser().navigateTo('#storyboard');
      
      expect(browser().location().url()).toBe("/storyboard");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

  it('should render challenges when user navigates to #challenges', function() {
      
      browser().navigateTo('#challenges');
      
      expect(browser().location().url()).toBe("/challenges");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });
  
  it('should render practice when user navigates to #practice', function() {
      
      browser().navigateTo('#practice');
      
      expect(browser().location().url()).toBe("/practice");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

});







