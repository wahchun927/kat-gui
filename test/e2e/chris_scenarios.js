'use strict';

describe('play_game_simulator tests', function() {
  var pauseAll = true;
  //You can load the runner with runner.html?pauseAll=true to see each page after each test.
  pauseAll = window.location.search.replace( "?pauseAll=", "" );
  
  //You can reload a page before every test if desired.
  //This can slow testing down but make test much more consistent.
  //beforeEach(function() {
  //  browser().navigateTo('../../app/controllertest.html');
  //});

  it('Should --Under construction --', function() {
    browser().navigateTo('../../app/client/play_game_simulator.html');
    
    //You can select by any element and then a name/value pair on that element. 
    //expect(element('li[name="questcount"]').text()).
    //    toMatch("Started Quests: 2");

    //expect(element('li[name="currentquest"]').text()).
    //    toMatch("Current Quest: ");

    if (pauseAll) pause();
  });
});

describe('Chris-provided controller tests', function() {
  var pauseAll = true;
  //You can load the runner with runner.html?pauseAll=true to see each page after each test.
  pauseAll = window.location.search.replace( "?pauseAll=", "" );
  
  //You can reload a page before every test if desired.
  //This can slow testing down but make test much more consistent.
  //beforeEach(function() {
  //  browser().navigateTo('../../app/controllertest.html');
  //});

  
  it('Should find the ajax-loaded items from PlayerController.', function() {
    //You don't have to reload the page unless you need to reset the values
    //browser().navigateTo('../../app/controllertest.html');
    //you can also just select by DIV order in the page but this can easily break.
    //expect(element(':nth-child(4) .ng-binding').text()).
    //    toMatch("Player nickname: Ruijun");

    if (pauseAll) pause();
  });

it('Should find the ajax-loaded items from InterfacesController.', function() {
    //browser().navigateTo('../../app/controllertest.html');
    //you can also just select by DIV order in the page but this can easily break.
    expect(element('p').text()).
        toMatch("Interfaces Count = 12");

    if (pauseAll) pause();
  });

 it('Should find the ajax-loaded items for GameController.', function() {
    //browser().navigateTo('../../app/controllertest.html');
    expect(element('li[name="numberofproblems"]').text()).
        toMatch("Number of Problems = ");
    
    //Click on the create_practice_game button.
    element('input[value="Create Practice Game"]').click();
    expect(element('li[name="numberofproblems"]').text()).
        toMatch("Number of Problems = 5");
    
    //Click on the create_quest_game button.
    element('input[value="Create Quest Game"]').click();
    expect(element('li[name="numberofproblems"]').text()).
        toMatch("Number of Problems = 5");
    
    //Click on the Load Game 0 button.
    element('input[value="Load Game 0"]').click();
    expect(element('li[name="numberofproblems"]').text()).
        toMatch("Number of Problems = 3");
    
    //Click on the Load Game 2 button.
    element('input[value="Load Game 2"]').click();
    expect(element('li[name="currentproblem"]').text()).
        toMatch("Current problem = 10119");

    //Click on the Load Game 3 button.
    element('input[value="Load Game 3"]').click();
    expect(element('li[name="currentproblem"]').text()).
        toMatch("Current problem = ");
    

    if (pauseAll) pause();
  });

 it('Should check a problem for a game with the GameController.', function() {
    //browser().navigateTo('../../app/controllertest.html');
    
    element('input[value="Check Solution For Game"]').click();
    expect(element('b').text()).
        toMatch("false");
    
    if (pauseAll) pause();
  });

 it('Should find the ajax-loaded items for PathController.', function() {
    //browser().navigateTo('../../app/controllertest.html');
    expect(element('ul[name="playerpathprogress"]').text()).
        toMatch("");
    
    //Click on the create_practice_game button.
    element('input[value="Update Progress 10030"]').click();
    expect(element('ul[name="playerpathprogress"]').text()).
        toMatch("Python");
    
    //Click on the create_quest_game button.
    element('input[value="Update Progress 2462233"]').click();
    expect(element('ul[name="playerpathprogress"]').text()).
        toMatch("Ruby");
    
    //Click on the Load Game 0 button.
    element('input[value="Update Path Details"]').click();
    expect(element('span[name="current_paths"]').text()).
        toMatch("5");
    
    if (pauseAll) pause();
  });

});
 


